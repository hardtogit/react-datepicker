/**
 * Created by xiangguo .
 * time:2017/12/22 0022.
 * email:413401168@qq.com.
 * use:auto...
 */
export const swiper_container ={
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
    listStyle: "none",
    padding: "0",
    zIndex: 1
    },
    swiper_wrapper={
    position: "relative",
    width: "100%",
    height: "100%",
    zIndex: "1",
    display: "-webkit-box",
    transitionProperty: "transform",
    boxSizing: "content-box"
    },
    swiper_slide ={
    textAlign: 'center',
    fontSize: '18px',
    background: "#fff",
    display: "-webkit-box",
    display: "flex",
    alignItems: "center"
    },
    img={
    width: "100%"
    },
    swiper_pagination={
         position: 'absolute',
         left: '50%',
         bottom: '12px',
         zIndex: 2,
         WebkitTransform: "translate(-50%)",
         MozTransform: 'translate(-50%)',
         transform: "translate(-50%)",
         OTransform: "translate(-50%)",
     },
    pagination_item={
        display: "inline-block",
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: "#fff",
        marginLeft: "12px"
    },
    pagination_item_active={
        display: "inline-block",
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: "#de3031",
        marginLeft: "12px"
},
    ui_picker_wrapper={
    width: "100%",
    height: "180px",
    overflow:"hidden",
    position: "relative",
    pointerEvents: "auto",
    marginTop: "18px",
    touchAction: "none",
    flex: 1
},
    ui_picker={
        width: "100%",
        transition: "transform",
        transitionDuration: ".3s",
        transitionTimingFunction: "ease-out",
    },
    ui_picker_item={
        height: "36px",
        lineHeight: "36px",
        textAlign: "center",
        color: "#999",
        fontSize: "18px",
        whiteSpace:"nowrap",
        textOverflow:"ellipsis",
        overflow:"hidden"
    },
    ui_picker_item_selected= {
        height: "36px",
        lineHeight: "36px",
        textAlign: "center",
        color: "#999",
        fontSize: "18px",
        whiteSpace:"nowrap",
        textOverflow:"ellipsis",
        overflow:"hidden",
        color: "#000"
        },
    ui_picker_center={
            height: "36px",
            boxSizing: "border-box",
            position: "absolute",
            left: 0,
            width: "100%",
            top: "50%",
            zIndex: 100,
            marginTop: "-18px",
            pointerEvents: "none",
            borderTop: "1px solid #d7d7d7",
            borderBottom: "1px solid #d7d7d7"
        },
    ui_popup_title={
            height: "44px",
            fontSize: "17px",
            background: "#ccc",
            padding: "0 10px",
            lineHeight: "44px",
    },
    btn_left={
        display: "inline-block",
        float: "left",
        color: "#007aff"
    },
    btn_right={
        display: "inline-block",
        float: "right",
        color: "#007aff"
    },
    pickerModal={
        position: "absolute",
        left: 0,
        bottom: 0,
        zIndex: 2,
        width: "100%",
        backgroundColor: "#efeff4",
        transform: "translate(0, 100%)",
        backfaceVisibility: "hidden",
        transition: "transform .3s"
    },
    ui_popup_content={
        height: "216px",
        width: "100%",
        display: "flex",
        overflow: "hidden",
        // -webkit-overflow-scrolling : touch,
    },
    modal_overlay ={
        position: "fixed",
        top: 0,
        left: 0,
        bottom:0,
        zIndex: 1000,
        backgroundColor:"rgba(11,11,11,0.4)",
        width: "100%"
    },
    modal ={
        position: "fixed",
        top: "calc(100% - 260px)",
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1001,
        backgroundColor: "#fff",
        width: "100%",
        height: "260px",
    },
    pickerModalActive={
        position: "absolute",
        left: 0,
        bottom: 0,
        zIndex: 2,
        width: "100%",
        backgroundColor: "#efeff4",
        backfaceVisibility: "hidden",
        transition: "transform .3s",
        transform: "translate(0, 0)",
        },
    pickerModalToggle={
       display:"block"
    }
