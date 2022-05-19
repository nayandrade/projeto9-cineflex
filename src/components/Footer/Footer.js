
import styled from 'styled-components';

export default function Footer ( {url, title } ) {
    return (
        <>
        <Foot>
            <div>
                <img src={url} alt="movie"></img>
            </div>
            <div>
                <p>{title}</p>
            </div>            
            
        </Foot>
        
        </>

    )
}

const Foot = styled.div`
    width: 100%;
    height: 117px;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #DFE6ED;
    border-top: 2px solid #9EADBA;
    

    div:first-child {
        width: 64px;
        height: 89px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 10px;
    }


    img {
        box-sizing: content-box;
        width: 48px;
        height: 72px;
        

    }

    p {
        font-size: 26px;
        margin: 0 10px;
    }

`