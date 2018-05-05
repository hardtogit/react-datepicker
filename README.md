react-datepicker-mobile
================

>a simple datePicker component <a href="https://hardtogit.github.io/react-datepicker/example/build/index.html" target="_blank">https://hardtogit.github.io/react-datepicker/example/build/index.html</a>

## get start

#### step one
```bash
clone or down this project
```
#### the second step
```bash
cd example
```
#### the third step
```bash
npm install
```
#### finally
```bash
npm start
```
## how to use

### Example with defaults
#### install
```bash
npm intsall --save react-datepicker-mobile
```
#### Creating an example component:
```javascript
import React,{Component} from 'react';
import DatePicker from 'react-datepicker-mobile';
class Index extents Component{
  componentDidMount(){
  this.refs.datePicker.toggle();
  }
  render: function() {
    return (
      <DatePicker ref="datePicker"> </DatePicker>  
    );
  },
};
export default Index;

