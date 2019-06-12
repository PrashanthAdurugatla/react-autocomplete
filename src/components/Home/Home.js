import React, { Component } from 'react';
import axios from "axios";
import './Home.css';
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            uniqueproducts: [],
            userInput: '',
            autocompleteSuggestions: [],
            autocompleteRowHighlighted: -1,
        }
    }

    componentDidMount(){
        axios
            .get('./products.json')
            .then(res => {
                this.setState({products: res.data.products});
                this.removeDuplicates(res.data.products)
            })
            .catch(err => {
                alert("Error in Fetching Data")
            })
    }

    removeDuplicates(products){
        const uniqueValues = Array.from(new Set(products.map(a => a.name)))
            .map(name => {
                return products.find(a => a.name === name)
            })
        this.setState({uniqueproducts:uniqueValues});
        // console.log(this.state.uniqueWords);
    }

    handleUserInput(e){
        let userInput = e.target.value;
        let autocompleteSuggestions = [];

        const {uniqueproducts } = this.state;
        // console.log(input); console.log(input.length);
        if (userInput.length > 0){
            for (let i = 0; i < uniqueproducts.length; i++){
                if (uniqueproducts[i].name.toLowerCase().includes(userInput.toLowerCase())){
                    autocompleteSuggestions.push(uniqueproducts[i].name);
                    if (autocompleteSuggestions.length >= 10){
                        i = uniqueproducts.length + 1;
                    }
                }
            }
        }
        this.setState({ userInput, autocompleteSuggestions})
    }

    handleKeyPress(e){
        const{autocompleteRowHighlighted, autocompleteSuggestions}=this.state
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter'){
            e.preventDefault();
        }else{
            return;
        }

        let rowHighlighted = autocompleteRowHighlighted;

        if (e.key === 'ArrowDown' && rowHighlighted < autocompleteSuggestions.length - 1){
            rowHighlighted ++;
        }
        if (e.key === 'ArrowUp' && rowHighlighted > -1){
            rowHighlighted --;
        }
        if (e.key === 'Enter' && rowHighlighted >= 0){
            let selection = autocompleteSuggestions[rowHighlighted];
            return this.selectAutocomplete(selection);
        }
        this.setState({
            autocompleteRowHighlighted: rowHighlighted
        })
    }

    setRowHighlighted(index){
        this.setState({
            autocompleteRowHighlighted: index
        })
    }

    selectAutocomplete(item){
        this.setState({
            userInput: item,
            autocompleteSuggestions: [],
            autocompleteRowHighlighted: -1
        })
    }

    findLink(e) {
        const {userInput,uniqueproducts} = this.state;
        for (let i = 0; i < uniqueproducts.length; i++){
            if (uniqueproducts[i].name.toLowerCase().includes(userInput.toLowerCase())){
                console.log(userInput);
                if(userInput===uniqueproducts[i].name){
                    window.open(uniqueproducts[i].url,'_blank')
                    //console.log(uniqueproducts[i].url);
                }
            }
        }
    }

    render() {
        const{userInput, autocompleteRowHighlighted,autocompleteSuggestions}=this.state;
        return (
            <div className='home'>
                <header className='header'>Personal Capital: Financial Software and Wealth Management </header>
                <div className='box center'>

                    <div className='search_bar'>
                        <input value={userInput} placeholder={"Search for Financial Institution"} onChange={ (e) => this.handleUserInput(e) } onKeyDown={ (e) => this.handleKeyPress(e)  } />
                        <img src='https://cdn1.iconfinder.com/data/icons/toolbar-signs/512/search-512.png' alt='search logo'  onClick= {(e) => this.findLink(e)} />
                        <div className='autocomplete_suggestions'>
                            {
                                autocompleteSuggestions.map( (item, i) => {
                                    let background = (i === autocompleteRowHighlighted) ? '#ccc' : '#fff';
                                    return (
                                        <div
                                            key={i}
                                            onClick={() => this.selectAutocomplete(item)}
                                            onMouseOver={ () => this.setRowHighlighted(i) }
                                            style={{background: background} }
                                            className='autocomplete_suggestions_item'>
                                            <p>{item}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;
