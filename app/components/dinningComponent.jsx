import React from 'react'
import  {Link} from 'react-router'
import styled from 'styled-components'

const DinningComponent = (props) => {
    return <div>
        <h1>同庆楼</h1>
        <div>
        <ul role="nav" style={{listStyle: "none", fontSize: "25px"}}>
        <li><StyledLink to="/hall">餐厅</StyledLink></li>
        <br />
        <li><StyledLink to="/kitchen">厨房</StyledLink></li>
        </ul>
        </div>
    </div>
}

const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`



export default DinningComponent