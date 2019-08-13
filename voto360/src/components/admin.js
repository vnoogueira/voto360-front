import React from 'react'
import {
  Route,
  Link
} from 'react-router-dom'
import ControlePermissoes from './controlePermissoes'

export const Admin = ({ match }) => (
  <div>
    <ul>
      <li>
        <Link to={`/controlePermissoes`}>
          Controle de permissoes
        </Link>
      </li>
    </ul>
    
    <Route path={`${match.url}/controlePermissoes`} component={ControlePermissoes}/>

  </div>
)
