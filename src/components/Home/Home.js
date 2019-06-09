import React, { Component } from 'react';
import axios from "axios";
import './Home.css';

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      words: [],
      length:0,
      userInput: '',
      autocompleteSuggestions: [],
      autocompleteRowHighlighted: -1,
    }
  }

  componentDidMount(){
      axios
          .get('./products.json')
          .then(res => {
              this.setState({words: res.data.products});
              this.setState({length:res.data.products.length})
              // console.log(this.state.words);
              // console.log(this.state.length);
          })
          .catch(err=>{
              alert("Error in Fetching Data")
          })

  }

  handleUserInput(e){
    var input = e.target.value;
    var set = new Set();
    var set1 = new Set();
     
    // console.log(input); console.log(input.length);
    if (input.length > 0){
      for (var i = 0; i < this.state.length; i++){
        if (this.state.words[i].name.toLowerCase().includes(input.toLowerCase())){
          set.add(this.state.words[i].name);
          set1.add(this.state.words[i].url);
          //console.log(set);
        }
      }
     
    }
    var matches = Array.from(set);
    var matchurl = Array.from(set1);
    console.log(matchurl);
    this.setState({
      userInput: input,
      autocompleteSuggestions: matches
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
  }

  render() {
    return (
      <div className="home">
          <div className='search_box'>

            <img src='https://cdn.vox-cdn.com/uploads/chorus_asset/file/6466217/fixed-google-logo-font.png' alt='google logo' className='google_logo' />

            <div className='search_bar'>
              <input value={this.state.userInput} onChange={ (e) => this.handleUserInput(e) } onKeyDown={ (e) => this.handleKeyPress(e) } />
              <img src='http://www.androidpolice.com/wp-content/uploads/2015/09/nexus2cee_GoogleLogo2.jpg' alt='voice logo' />
              {/*<div style={{ overflow: 'scroll', border: '5px grey', height: '400px'}}>*/}
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
            {/*</div>*/}

          </div>
      </div>
    );
  }
}


export default Home;