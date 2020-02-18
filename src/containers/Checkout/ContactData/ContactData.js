import React, {Component} from "react";
import classes from './ContactData.Module.css';
import Button from '../../../components/UI/Button/Button'

class ContactData extends Component {

    state = {
      userName:'',
      email:'',
      address: {
          street: '',
          postalCode: '',
      }

    };

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input type='text' name='name' placeholder='Your name' />
                    <input type='email' name='email' placeholder='Your email' />
                    <input type='text' name='street' placeholder='Street' />
                    <input type='text' name='postalCode' placeholder='Postal Code' />
                    <Button btnType='Success'>ORDER</Button>
                    <Button>CANCEL</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;



