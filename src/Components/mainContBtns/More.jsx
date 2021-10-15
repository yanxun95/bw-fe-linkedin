import React from "react";
import "./contBtns.css";
import { Dropdown, Butoon, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoReturnUpForwardOutline } from "react-icons/io5";
import { BsDownload, BsNewspaper } from "react-icons/bs";
export default function More({ personAcc, profileId}) {

  const downloadPdf = () => {
    //e.PreventDefault()
   // let response = await fetch(`${process.env.REACT_APP_BE_URL}/profiles/${profileId}/Pdf`)
    //let pdf = await response.json()
            fetch(`${process.env.REACT_APP_BE_URL}/profiles/${profileId}/Pdf`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/pdf',
            },
          })
        .then((response) => response.blob())
        .then((blob) => {
          // Create blob link to download
          const url = window.URL.createObjectURL(
            new Blob([blob]),
    );
  });
  const link = document.createElement('a');
    link.href = `https://bw3-be.herokuapp.com/profiles/${profileId}/Pdf`;
    link.setAttribute(
      'download',
      `FileName.pdf`,
    );

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
 
}

  return (
    <>
      {!personAcc && (
        <div className="dropdownCard d-flex flex-column align-items-center justify-content-between">
          
          <Link
            to="/"
            className="d-flex justify-content-between align-items-center linkCard w-100"
          >
            <IoReturnUpForwardOutline size="1.4rem" />
            <p className="ml-2 font-weight-light m-0 text-right">
              Share profile in a message
            </p>
          </Link>

          <Link  
            to="/"
            className="d-flex justify-content-between align-items-center linkCard w-100"
          >
            <BsDownload size="1.4rem" />
            <p className="ml-2 font-weight-light m-0">Save to PDF</p>
          </Link>

{/*           
          <Link
            to="/"
            className="d-flex justify-content-between align-items-center linkCard w-100"
          >
            <BsNewspaper size="1.4rem" />
            <p className="ml-2 font-weight-light m-0">Build a resume</p>
          </Link> */}

        <div 
            className="d-flex justify-content-between align-items-center linkCard w-100"
          >
            <BsNewspaper size="1.4rem" />
            <p  onClick = {() => downloadPdf() }  className="ml-2 font-weight-light m-0">Build a resume</p>
          </div>
        </div>
      )}
    </>
  );
}
