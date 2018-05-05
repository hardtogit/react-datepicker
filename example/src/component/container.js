import React,{Component} from 'react'
import * as  styles from './lineStyle'
import Line from './Line'
import DatePicker from "../../../lib/datePicker"

class Index extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.refs.datePicker.toggle()
    }
    render(){
        return(
            <div>





                <DatePicker ref="datePicker" value="2014-04-02" onConfirm={this.handle}></DatePicker>
            </div>

        )
    }
}
export default Index