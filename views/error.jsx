/*<!--extends layout

block content
  h1= message
  h2= error.status
  pre #{error.stack}-->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8" />
    <title>error</title>
</head>
<body>
    <div>
        <h1><%= message %></h1>
        <h2><%= error.status %></h2>
        <pre><%= error.stack %></pre>
    </div>
</script>
</body>
</html>*/
import React from 'react'
import ReactDOM from 'react-dom'

class ErrorComponent extends React.Component {
     constructor(props) {
         super(props)
         this.state = {}
     }

     render () {
         console.log(this.props)
         return(
             <div></div>
         )
     }
}

/*const errorComponent = <div>
    <h1>{this.props.message}</h1>
    <h2>{this.props.error.status}</h2>
    <pre>{this.props.error.stack}</pre>
</div>*/

// ReactDOM.render(
//     <errorComponent />,
//     <div></div>
// )
export default ErrorComponent