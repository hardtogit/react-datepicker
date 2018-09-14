/**
 * Created by xiangguo .
 * time:2018/2/1 0001.
 * email:413401168@qq.com.
 * use:auto...
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Line from './Line'
import {getProvince, getCity} from './regionUtils'
import * as styles from './style'

class Index extends Component {
  static propTypes = {
    onConfirm: PropTypes.func.isRequired,
    beginYear: PropTypes.number,//开始年份
    endYear: PropTypes.number,//结束年份
    value: PropTypes.string,//初始值  eg "2018-02-03"
    labels: PropTypes.string //要显示的列 eg "year,month,day,h,m,s"
  };
  static defaultProps = {
    labels: 'year,month,day',
    value: '',
    beginYear: 2000,
    endYear: 2050
  }
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      provinceData: getProvince(),
      cityData: getCity(11, 0),
      regionData: getCity(1101, 1)
    };
    this.mappingObj = {
      province: '省',
      city: '市',
      region: '区'
    }
  }
  componentDidMount() {

  }

  handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    this.toggle()
  }

    handleChange = (value, type) => {
      if (type === 'province') {
        this.setState({
          cityData: getCity(value.id, 0),
          regionData: getCity(getCity(value.id, 0)[0].id, 1)
        })
      } else if (type === 'city') {
        this.setState({
          regionData: getCity(value.id, 1)
        })
      }
    }

    handleConfirm() {
      if (this.props.onConfirm) {
        this.props.onConfirm(this.state.valueGroups);
      }
      this.toggle()
    }

    toggle = () => {
      this.setState({
        open: !this.state.open
      })
    };
    render() {
      const {provinceData, cityData, regionData} = this.state;
      const isZh = !navigator.language ||
            navigator.language.toLowerCase() === 'zh-cn' ||
            navigator.language.toLowerCase() === 'zh';
      let text1 = !isZh ? 'Cancel' : '取消';
      let text2 = !isZh ? 'Finish' : '完成';
      const {optionGroups} = this.props;
      let mstyle = {position: 'fixed', width: '100%',height:'100%', top: 0, bottom: 0, display: 'none'};
      if (this.state.open) {
        mstyle = {position: 'fixed', width: '100%',height:'100%', top: 0, bottom: 0, display: 'block'}
      }
      return (
        <div id="picker"
          style={mstyle}
        >
          <div style={{position: 'relative', width: '100%', height: '100%'}}>
            <div className="pickerModal"
              style={this.state.open && styles.pickerModalActive || styles.pickerModal}
            >
              <div className="ui_popup_title"
                style={styles.ui_popup_title}
              >
                <span ref="cancelButton"
                  style={styles.btn_left}
                >{text1}</span>
                <span ref="confirmButton"
                  style={styles.btn_right}
                >{text2}</span>
              </div>
              <div className="datePicker_labels"
                style={styles.datePicker_labels}
              >
                {
                  optionGroups.map((item,i) => {
                    return <div className="datePicker_label"
                      key={i}
                      style={styles.datePicker_label}
                    >{this.mappingObj[item]}</div>

                  })
                }

              </div>
              <div className="ui_popup_content"
                style={styles.ui_popup_content}
              >
                <Line dataSource={provinceData}
                  labelProp="name"
                  onChange={(value) => {
                    this.handleChange(value, 'province')
                  }}
                >
                </Line>
                <Line dataSource={cityData}
                  labelProp="name"
                  onChange={(value) => {
                    this.handleChange(value, 'city')
                  }}
                >
                </Line>
                <Line dataSource={regionData}
                  labelProp="name"
                  onChange={(value) => {
                    this.handleChange(value, 'region')
                  }}
                >
                </Line>
              </div>
            </div>
          </div>
        </div>

      )
    }
}

export default Index;