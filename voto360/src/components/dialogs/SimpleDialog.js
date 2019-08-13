import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class SimpleDialog extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false,
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      open: nextProps.open
    })
  }

  handleClose = () => {
    this.props.onRequestClose();
    // this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Entendi"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    return (
      <div>
        <Dialog
          title={this.props.title}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.props.message}
        </Dialog>
      </div>
    );
  }
}
