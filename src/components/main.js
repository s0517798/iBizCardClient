import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Cards from './cards';
import About from './about';
import NotFound from './notFound';
import EditCardForm from './forms/editCardForm';
import AddCardForm from './forms/addCardForm';


const Main = () => {
  return ( 
    <main>
      <Switch>
        <Route path='/about' component={About} />
        <Redirect from='/cards' exact to='/' />
        <Route path='/cards/add' component={AddCardForm} />
        <Route path='/cards/edit/:id' component={EditCardForm} />
        <Route path='/not-found' component={NotFound} />
        <Route path='/'  component={Cards} />
        <Redirect to='/not-found' />
      </Switch>
    </main>
   );
}
 
export default Main;