import React, { useRef, useState } from "react";
import "./Epaper_details.css";
import "./Epaper.css";
import { Viewer, Worker, WorkerOptions } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import axios from "axios";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import { FaBeer } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";


const Epaper_details = () => {

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const thumbnailPluginInstance = thumbnailPlugin();

  const location = useLocation();
  const [showImageModal, setShowImageModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const openImageModal = () => {
    setShowImageModal(true);
  };

  // Function to close the image pop-up
  const closeImageModal = () => {
    setShowImageModal(false);
  };

  const initialState = location.state
  const data = initialState.pdf;

  const [viewPdf, setViewPdf] = useState(null);
  const page = useRef(0);
  const orgHeight = location.state.sizes[0];
  const [myHeight, setMyHeight] = useState(0);
  const zoom = useRef(0);
  const [button, setButton] = useState(false);


  {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = (e) => {
      setViewPdf(e.target.result);
    };
  }

  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const handlePageChange = (e: PageChangeEvent) => {
    page.current = e.currentPage;
  };

  const handleZoom = (e: ZoomEvent) => {
    console.log(`Zoom to ${e.scale}`);
    zoom.current = e.scale;
  };

  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    var element = document.querySelector(".rpv-core__page-layer--single");
    var rect = element.getBoundingClientRect();
    setMyHeight(rect.height);

    zoom.current = rect.height / orgHeight;
    setOffsetX(rect.x);
    setOffsetY(0);
  };

  const startX = useRef(0);
  const startY = useRef(0);
  const endX = useRef(null);
  const endY = useRef(null);

  const scrollbar = useRef(0);
  const [finalCo, setFinalCo] = useState({
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0,
  });

  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;
    scrollbar.current =
      (document.querySelector(".pdf-container")?.offsetWidth -
        document.querySelector(".rpv-core__inner-page")?.offsetWidth) /
      2;

    // Check if event.target.offsetParent is not undefined
    if (event.target.offsetParent) {
      setOffsetX(event.target.offsetParent.offsetLeft);
      if (button !== true) {
        endX.current = null;
        endY.current = null;
        startX.current = clientX;
        startY.current = clientY;
      } else return;
    }
  };

  // const handleMouseUp = (event) => {
  //   const { clientX, clientY } = event;

  //   if (button === true) {
  //     return;
  //   }
  //   endX.current = clientX;
  //   endY.current = clientY;

  //   if (offsetY >= 0) {
  //     setFinalCo({
  //       minX: (startX.current - offsetX) / zoom.current,
  //       minY: (startY.current - offsetY) / zoom.current,
  //       maxX: (clientX - offsetX - scrollbar.current) / zoom.current,
  //       maxY: (clientY - offsetY) / zoom.current,
  //     });
  //     if (startX.current !== clientX && startY.current !== clientY) {
  //       setButton(true);
  //     }
  //   } else {
  //     return;
  //   }
  // };
  const handleMouseUp = (event) => {
    const { clientX, clientY } = event;
  
    if (button === true) {
      return;
    }
  
    if (offsetY >= 0) {
      const minX = (startX.current - offsetX) / zoom.current;
      const minY = (startY.current - offsetY) / zoom.current;
      const maxX = (clientX - offsetX - scrollbar.current) / zoom.current;
      const maxY = (clientY - offsetY) / zoom.current;
  
      if (startX.current !== clientX && startY.current !== clientY) {
        // Trigger fetchData with the calculated coordinates
        fetchData({
          stopPropagation: () => {},
        }, minX, minY, maxX, maxY);
      }
    }
  };

  const [extractedData, setExtractedData] = useState(null);
  const [body, setBody] = useState(null);
  const [image, setImage] = useState("");

  // const fetchData = async (e) => {
  //   setLoader(true)
  //   e.stopPropagation();
  //   setExtractedData(null);
  //   startX.current = null;
  //   startY.current = null;
  //   endX.current = null;
  //   endY.current = null;
  //   setButton(false);
  //   var formData = new FormData();
  //   console.log(finalCo, 'aaa');
  //   formData.append("pdf", data);
  //   try {
  //     const response = await axios.post(
  //       `http://174.138.101.222:5000/api/extractdata_withfont2?x_min=${Math.round(
  //         finalCo.minX - 80
  //       )}&x_max=${Math.round(finalCo.maxX - 80)}&y_min=${Math.round(
  //         finalCo.minY - 80
  //       )}&y_max=${Math.round(finalCo.maxY - 80)}&page_number=${page.current}`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     let resData = response;
  //     console.log(response);
  //     setImage(`http://174.138.101.222:5000${response.data.image_url}`);
  //     setLoader(false)
  //     openImageModal()
  //   } catch (error) {
  //     console.log(error);
  //     alert("Error Occured");
  //   }
  // };
  const fetchData = async (e, minX, minY, maxX, maxY) => {
    setLoader(true);
    e.stopPropagation();
    setExtractedData(null);
    startX.current = null;
    startY.current = null;
    endX.current = null;
    endY.current = null;
    setButton(false);
  
    var formData = new FormData();
    formData.append("pdf", data);
  
    try {
      const response = await axios.post(
        `http://174.138.101.222:5000/api/extractdata_withfont2?x_min=${Math.round(
          minX - 80
        )}&x_max=${Math.round(maxX - 80)}&y_min=${Math.round(
          minY - 80
        )}&y_max=${Math.round(maxY - 80)}&page_number=${page.current}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let resData = response;
      console.log(response);
      setImage(`http://174.138.101.222:5000${response.data.image_url}`);
      setLoader(false);
      openImageModal();
    } catch (error) {
      console.log(error);
      alert("Error Occurred");
    }
  };
  
  const getSelectionStyles = () => {
    if (startX.current && startY.current && endX.current && endY.current) {
      const left = Math.min(startX.current, endX.current);
      const top = Math.min(startY.current, endY.current);
      const width = Math.abs(startX.current - endX.current);
      const height = Math.abs(startY.current - endY.current);

      return {
        position: "absolute",
        left: left + "px",
        top: top + "px",
        width: width + "px",
        height: height + "px",
        border: "1px solid blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        pointerEvents: "none",
      };
    } else {
      return {};
    }
  };


  ///////////////////////////////// To send in Draft ///////////////////////////////////////

  ///////////////////////////////// To send draft request ///////////////////////////////////////


  return (
    <div className="home-container">
      <div
        className="pdf-container"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
          {viewPdf && (
            <>
              <Viewer
                initialPage={0}
                fileUrl={viewPdf}
                defaultScale={0.5}
                onPageChange={handlePageChange}
                onZoom={handleZoom}
                onDocumentLoad={handleDocumentLoad}
                plugins={[defaultLayoutPluginInstance, thumbnailPluginInstance]}
              />
              {button && (
                <button className="btn btn-primary"
                  onClick={fetchData}
                  style={{ position: "absolute", top: "20%", right: "20%" }}
                >
                  Crop Image
                </button>
              )}
            </>
          )}
        </Worker>
      </div>
      {loader && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}

      <div style={getSelectionStyles()}></div>

      <Modal isOpen={showImageModal} onRequestClose={closeImageModal}>
        <div style={{ position: 'relative' }}>
          <AiOutlineCloseCircle
            onClick={closeImageModal}
            style={{
              position: 'absolute',
              top: '30px', 
              right: '10px',
              fontSize: '40px',
              cursor: 'pointer',
              zIndex: 1, 
              color:'black'
            }}
          />
          <img style={{ width: '100%', height: '90%' }} src={image} alt="Image" />
        </div>
      </Modal>

    </div>
  );
};

export default Epaper_details;
