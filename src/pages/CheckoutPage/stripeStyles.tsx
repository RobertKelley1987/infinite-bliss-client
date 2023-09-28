export const stripeFonts = [
    { 
        cssSrc: 'https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap' 
    }
];

export const stripeStyles = {
    variables: { 
        fontWeight: "300",
        fontWeightLight: "300", 
        fontWeightBold: "300", 
        fontWeightMedium: "300", 
        fontWeightNormal: "300",
        spacingGridColumn: "1rem",
        spacingGridRow: "1rem",
        colorDanger: "red"
    },
    rules: {
        "option.Input": {
            fontWeight: "300",
        },
        ".Input": {
            border: "1px solid #282828",
            borderRadius: "0",
            color: "#282828",
            fontFamily: "Kanit",
            fontSize: "16px",
            fontWeight: "300",
            height: "50px",
            padding: "1rem"
        },
        ".Input--invalid": {
            border: "1px solid red",
            boxShadow: "0px solid red"
        },
        ".Input:focus": {
            border: "1px solid #7556FF",
            boxShadow: "0px solid #282828"
        },
        ".Input--invalid:focus": {
            border: "1px solid red",
            boxShadow: "0px solid red"
        },
        ".Label": {
            color: "#282828",
            fontFamily: "Kanit",
            fontSize: "16px",
            fontWeight: "300",
            lineHeight: "1",
            marginBottom: ".5rem"
        },
        ".Error": {
            color: "red",
            fontFamily: "Kanit",
            fontSize: "16px",
            fontWeight: "300"
        },
        "#Field-countryInput": {
            height: "50px",
            lineHeight: "1"
        }
    }
}