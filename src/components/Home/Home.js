import React, { Component } from 'react';
import axios from "axios";
import './Home.css';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            words: [],
            uniqueWords:[],
            length:0,
            userInput: '',
            userInputUrl:'',
            autocompleteSuggestions: [],
            autocompleteRowHighlighted: -1,
        }
    }

    componentDidMount(){
        axios
            .get('./products.json')
            .then(res => {
                this.setState({words: res.data.products});
                this.setState({length:res.data.products.length});
                this.removeDuplicates(res.data.products)
            })
            .catch(err=>{
                alert("Error in Fetching Data")
            })
    }

    removeDuplicates(products){
        // console.log(products);
        const uniqueValues = Array.from(new Set(products.map(a => a.name)))
            .map(name => {
                return products.find(a => a.name === name)
            })
        this.setState({uniqueWords:uniqueValues});
        // console.log(this.state.uniqueWords);
    }

    handleUserInput(e){
        var input = e.target.value;
        var matches=[];

        const {uniqueWords } = this.state;
        // console.log(input); console.log(input.length);
        if (input.length > 0){
            for (var i = 0; i < uniqueWords.length; i++){
                if (uniqueWords[i].name.toLowerCase().includes(input.toLowerCase())){
                    matches.push(uniqueWords[i].name);
                }
            }
        }
        this.setState({
            userInput: input,
            autocompleteSuggestions: matches,

        })
    }

    handleKeyPress(e){
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter'){
            e.preventDefault();
        }else{
            return;
        }

        let rowHighlighted = this.state.autocompleteRowHighlighted;

        if (e.key === 'ArrowDown' && rowHighlighted < this.state.autocompleteSuggestions.length - 1){
            rowHighlighted ++;
        }
        if (e.key === 'ArrowUp' && rowHighlighted > -1){
            rowHighlighted --;
        }
        if (e.key === 'Enter' && rowHighlighted >= 0){
            let selection = this.state.autocompleteSuggestions[rowHighlighted];
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
        this.findInputIndex(item);
    }

    findInputIndex(item){
        const {uniqueWords } = this.state;
        var url;
        for (var i = 0; i < uniqueWords.length; i++){
            if (uniqueWords[i].name.toLowerCase().includes(item.toLowerCase())){
                url=uniqueWords[i].url;
            }
        }
        // console.log(url);
        this.setState({
            userInputUrl: url,
        })
    }

    render() {
        return (
            <div className="home">
              <div className='search_box'>

                <img src='https://cdn.vox-cdn.com/uploads/chorus_asset/file/6466217/fixed-google-logo-font.png' alt='google logo' className='google_logo' />

                <div className='search_bar'>
                  <input value={this.state.userInput} onChange={ (e) => this.handleUserInput(e) } onKeyDown={ (e) => this.handleKeyPress(e) } />
                  <img src='https://upload.wikimedia.org/wikipedia/commons/4/4f/Search-button.png' alt='search logo' onClick= {this.state.userInputUrl}/>

                      <div className='autocomplete_suggestions'>
                      {
                          this.state.autocompleteSuggestions.map( (item, i) => {
                              var background = (i === this.state.autocompleteRowHighlighted) ? '#ccc' : '#fff';
                              return (
                                  <div
                                      key={i}
                                      onClick={() => this.selectAutocomplete(item)}
                                      onMouseOver={ () => this.setRowHighlighted(i) }
                                      style={{background: background}}
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
