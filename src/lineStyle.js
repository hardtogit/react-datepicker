export const picker = {
        height: "100%",
        margin: 0,
        flex: 1,
        border: 'none',
        backgroundColor: '#ddd',
        position: "relative",
        boxSizing: 'border-box',
        overflow: 'hidden'
    },
    pickerInner = {
        position: 'relative',
        height: '100%',
        width: '100%',
        WebkitMaskBoxImage: "-webkit-linear-gradient(bottom,transparent,transparent 5%,#fff 20%,#fff 80%,transparent 95%,transparent)"

    },
    pickerRule = {
        boxSizing: 'borderBox',
        padding: 0,
        margin: '-18px 0 0',
        width: '100%',
        height: '36px',
        lineHeight: '36px',
        position: 'absolute',
        left: 0,
        top: '50%'
    },
    pickerRuleCenter = {
        zIndex: 2,
        borderTop: "1px solid rgba(0,0,0,.1)",
        borderBottom: "1px solid rgba(0,0,0,.1)"
    },
    pickerList = {
        zIndex:1,
        transformStyle:'preserve-3d',
        WebkitTransformStyle:'preserve-3d',
        padding:0,
        transition:'150ms ease-out',
        listStyle:'none',
        outline:0
    },
    pickerLi ={
        width:'100%',
        height:'100%',
        position:'absolute',
        textAlign:'center',
        verticalAlign:'middle',
        backfaceVisibility:'hidden',
        fontSize:'1pc',
        fontFamily:'"Helvetica Neue",Helvetica,Arial,sans-serif',
        color:'#888',
        padding:'0 8px',
        whiteSpace:'nowrap',
        textOverflow:'ellipsis',
        cursor:'default',
        visibility:'hidden',
        boxSizing:'border-box',
        overflow:'hidden',
        transformOrigin:'center center -90px'
    };
