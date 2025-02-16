import { Component } from "react";
import "./App.css";
import cats from "./mockCats.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import CatEdit from "./pages/CatEdit.js";
import CatIndex from "./pages/CatIndex.js";
import CatNew from "./pages/CatNew.js";
import CatShow from "./pages/CatShow.js";
import Home from "./pages/Home.js";
import NotFound from "./pages/NotFound.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: cats
    };
  }
  createNewCat = (newcat) => {
    console.log(newcat)
  }
  
  updateCat = (cat, id) => {
    console.log("cat:" , cat)
    console.log("id:" , id)
  }

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route
            path="/catindex"
            render={() => <CatIndex cats={ this.state.cats } />}
          />
          <Route path="/catshow/:id" render = {(props) => {
            //get the id from the URL
            // Const id to be that of the id of a cat and the plus sign changes the datatype to an integer because without it it will be passed as a string
            const id = +props.match.params.id;
            // finding the cat from mock data using the id by finding the cats data
            const foundKitty = this.state.cats.find(cat => cat.id === id);
            // pass that cat into CatShow as propData
            return <CatShow cat={foundKitty}/>}
          } />
          <Route path="/catnew" render={(props) => {
            return <CatNew createNewCat={
              this.createNewCat } />
          }}
           />
          <Route 
          exact path={ "/catedit/:id" } render={(props) => {
            let id = props.match.params.id
            let cat = this.state.cats.find(cat => cat.id === +id)
            return (
              <CatEdit
                updateCat = { this.updateCat }
                cat={ cat }
              />
            )
          }} 
        />
          <Route component={ NotFound } />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
