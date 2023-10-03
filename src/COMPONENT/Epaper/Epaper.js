import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function Epaper() {
  const agencyDetails = useSelector((state) => {
    return state.User;
  });
  const navigate = useNavigate();
  const [pdfFile, setPdfFile] = useState([]);
  const getCategories = async () => {
    try {
      const response = await axios.get(
        `http://174.138.101.222:8080/${agencyDetails._id}/Epapers`
      );
      setPdfFile(response.data.epapers)

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, [agencyDetails]);
  
  // const [size, setSize] = useState({});

  // const [loader, setLoader] = useState(false);

  // const fetchPageSize = async (pdfUrl) => {
  //   setLoader(true);
    
  //   try {
  //     // Download the PDF file
  //     const pdfBlob = await fetch(pdfUrl).then((response) => response.blob());
      
  //     // Create a FormData object and append the downloaded PDF file to it
  //     let formdata = new FormData();
  //     formdata.append("pdf", pdfBlob, "pdf.pdf");
      
  //     // Send a POST request to the server
  //     const response = await axios.post(
  //       "http://174.138.101.222:5000/api/coordinate",
  //       formdata,
  //       {
  //         headers: {
  //           "Content-type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     response.data.coordinates.forEach((item, index) => {
  //       setSize((prevSize) => ({
  //         ...prevSize,
  //         [index]: item[1],
  //       }));
  //     });
      
  //     setLoader(false);
  //   } catch (error) {
  //     console.log(error);
  //     console.error("Response Data:", error.response ? error.response.data : "No response data available");
  //     alert("Error Occurred");
  //     setLoader(false);
  //   }
  // };


  return (
    <div className="container">
      <div className="viewer">
        {
          pdfFile.length > 0 ? (
            <div>
              <h3 style={{ marginTop: '40px', marginBottom: '40px',marginLeft:'10px' }}>News Paper</h3>
              <div className="album py-5 bg-light">
                <div className="container">
                  <div className="row">
                    {pdfFile
                      .reverse()
                      .slice(0, 3)
                      .map((item, index) => {
                        return (
                          <div className="col-md-4"
                            onClick={() => {
                              navigate(
                                `/${agencyDetails._id}/Epaper/${item._id}`, { state: item }
                              );
                            }}
                            >
                            <div className="card mb-4 box-shadow">
                              <img
                                className="card-img-top"
                                style={{ height: '400px' }}
                                src={item.image}
                              />
                              <div className="card-body">
                                <p className="card-text">
                                  {item.category}
                                </p>
                                <p className="card-text">
                                  {item.date}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '25%', marginBottom: '25%' }}>
              <p>No Epaper is Uploaded yet</p>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Epaper;
