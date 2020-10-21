import React, { useState,useEffect } from 'react'
import './about.css'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

function About() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    let input = React.createRef();

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            let inputVal = Number(input.current.value);
            if (!isNaN(inputVal) && inputVal <= numPages && inputVal !== 0) {
                setPageNumber(inputVal)
            } else {
                input.current.value = pageNumber
            }
        }
    }
   
    useEffect(() => {
        input.current.value = pageNumber
    });

    function goToPrevious() {
        let inputVal = Number(input.current.value);
        if (inputVal > 1) {
            setPageNumber(inputVal - 1)
        }
    }

    function goToNext() {
        let inputVal = Number(input.current.value);
        if (inputVal < numPages) {
            setPageNumber(inputVal + 1);
        }
    }

    function getLeftClassNames() {
        if (pageNumber) {
            let currentpage = Number(pageNumber);
            if (currentpage > 1) {
                return "enableArrow"
            }
            else {
                return "disableArrow"
            }
        }
        return "enableArrow"
    }

    function getRightClassNames() {
        if (pageNumber && numPages) {
            let currentpage = pageNumber;
            if (currentpage < numPages) {
                return "enableArrow"
            }
            else {
                return "disableArrow"
            }
        }
        return "enableArrow"
    }

    let leftArrowClass = getLeftClassNames();
    let rightArrowClass = getRightClassNames();
    return (
        <div className='about'>
            <h3 className=''>Catalog</h3>
            <div className='pageNavigation'>
                <span className={leftArrowClass} onClick={goToPrevious}>
                    <i className="fas fa-arrow-left"></i>
                </span>
                <input type="text" className='currentPageInput' ref={input} onKeyPress={handleKeyPress}></input>
                <span>&#47;</span>
                <span className='totalPageInput'>{numPages}</span>
                <span className={rightArrowClass} onClick={goToNext}><i className="fas fa-arrow-right"></i></span>
            </div>
            <div>
                <Document
                    file={"https://cdn.glitch.com/9c6632f8-26c9-40c9-aad2-278ed150319f%2Fcatalog.pdf?v=1603150396657"}
                    onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} height={window.innerHeight - 200} />
                </Document>
            </div>
        </div>
    )


}

export default About;