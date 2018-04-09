/**
 * react router中在js代码中执行router跳转，可采用history库。多多参考https://reacttraining.com/react-router/
 */
//----------------App.js------------//
// some necessary import;
import createHistory from 'history/createBrowserHistory';
const history = createHistory({
    basename: '/views'  // 总共有三种URL配置形式
});
// this history is a global variable, it will use in children component
export {history};  

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        return (
            <Router history={history}>
            <Switch>
                <Route exact path="/" component={Note}/>
                <Route path="/login" component={Login}/>
                <Route path="/calendar" component={Calendar}/>
                <Route path="/my" component={MyBook}/>
                <Route path="/status" component={BookStatus}/>
                <Route path="/booking" component={AdminBooking}/>
            </Switch>
            </Router>
        );
    }
}

//--------------------------login.js------------------------//
import {history} from '../App.js'
function login() {
  return system.ajax({
      'method': 'post',
      'url': 'http://xxx',
      'data': {
          'username': username,
          'password': password,
      }
  })
  .then(res => {
      //
      if (this.props.location && this.props.location.state) {
          history.replace(this.props.location.state.repath || '/');
      } else {
          history.replace('/');
      }
  })
  .catch(reason => {
      console.log(reason)
      console.log('cowutiui')
  });
}
