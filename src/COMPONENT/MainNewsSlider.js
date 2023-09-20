import React, { useState, useEffect } from 'react'
import Article from '../Template/Article'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import '../Template/MainStyle.css';
import '../Sidebar/Sidebar.css';

function MainNewsSlider({ agencyDetails, breakingNews, page_name }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        'http://174.138.101.222:8080/getmastercategories'
      );
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to split the categories into pairs
  const splitCategoriesIntoPairs = (categories) => {
    const pairs = [];
    for (let i = 0; i < categories.length; i += 2) {
      if (i + 1 < categories.length) {
        pairs.push([categories[i], categories[i + 1]]);
      } else {
        pairs.push([categories[i]]);
      }
    }
    return pairs;
  };

  const [ad, setAd] = useState();

  const fetchAd = async () => {
    try {
      const response = await axios.get(`http://174.138.101.222:8080/${id}/${page_name}/Below_Breaking_News/get-Advertisement`)
      // console.log(response.data.data[0])
      setAd(response.data.data[0])
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAd();
  }, [id, page_name])

  useEffect(() => {
    getCategories();
  }, []);

  // Pagination for categories
  const [currentCategoryPage, setCurrentCategoryPage] = useState(1);
  const categoryItemsPerPage = 8; // Number of categories to display per page

  const startIndex = (currentCategoryPage - 1) * categoryItemsPerPage;
  const endIndex = startIndex + categoryItemsPerPage;
  const categoriesToShow = categories.slice(startIndex, endIndex);

  const handleNextCategoryPage = () => {
    if (endIndex < categories.length) {
      setCurrentCategoryPage(currentCategoryPage + 1);
    }
  };

  const handlePrevCategoryPage = () => {
    if (startIndex > 0) {
      setCurrentCategoryPage(currentCategoryPage - 1);
    }
  };

  const handleCategoryPageClick = (pageNumber) => {
    setCurrentCategoryPage(pageNumber);
  };

  const categoryTotalPages = Math.ceil(categories.length / categoryItemsPerPage);
  const categoryPageNumbers = Array.from(
    { length: categoryTotalPages },
    (_, i) => i + 1
  );



  return (
    <div className="container">
      <div className="row " style={{ display: 'flex', flexDirection: 'row' }} >
        <div className="col-md-8 col-sm-8">
          <div className='Content'>
            <div className='featured'>
              <h2 className='title'>Featured News</h2>
              <div className="Main-image">
                <div style={{ maxHeight: '400px' }}>
                  <Carousel
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    autoPlay={true}
                    showIndicators={false}
                    showArrows={true}
                    emulateTouch={true}
                  >
                    {breakingNews.length &&
                      breakingNews.map((news) => {
                        return (
                          <div
                            key={news._id}
                            className="w-100 d-block"

                            onClick={() => {
                              navigate(
                                `/${agencyDetails._id}/DetailedNews/${news._id}`,
                                {
                                  state: {
                                    item: news,
                                    agencyDetails: agencyDetails,
                                  },
                                }
                              );
                            }}
                          >
                            <img
                              src={

                                news.image
                                  ? `http://174.138.101.222:8080${news.image}`
                                  : `https://www.newsclick.in/sites/default/files/2018-09/xfakenews_0.jpg.pagespeed.ic_.232PSP6q2x_0.jpg`
                              }
                              alt="..."
                              height={'300px'}
                            />
                            <div style={{ width: '100%', height: '100px' }} >
                              <h5>{news.title}</h5>
                              <p>{news.short_details}</p>
                            </div>
                          </div>
                        );
                      })}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: '100px' }} >
            {
              ad?.script.length > 0 && <p className="mb-0" style={{ border: '1px solid black', width: '100%', height: '100px', overflow: 'hidden' }}>{ad?.script}</p>
            }
            {
              ad?.text.length > 0 && <p className="mb-0" style={{ border: '1px solid black', width: '100%', height: '100px', overflow: 'hidden' }}>{ad?.text}</p>
            }
            {
              ad?.image.length > 0 && <img style={{ width: '94%', height: '100%' }} src={`http://174.138.101.222:8080${ad?.image}`} />
            }
          </div>
        </div>
        <div className="col-md-4 col-sm-4">
          <div className="sidebar">
            <div className="box">
              <h2 className="title">Categories</h2>
              <div className="sponsors">
                {splitCategoriesIntoPairs(categories).map((pair, index) => (
                  <div key={index} className="displayinline">
                    {pair.map((item, itemIndex) => (
                      <div key={itemIndex} className="categories-item"
                        onClick={() =>
                          navigate(
                            `/${agencyDetails._id}/Category/${item.categories_Name_Url}`,
                            {
                              state: { agencyDetails },
                            }
                          )
                        }>
                        <a className='categories-item-a'>{item.categories_Name_Hindi}</a>
                      </div>
                    ))}
                  </div>
                ))}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        <a
                          className="page-link"
                          onClick={handlePrevCategoryPage}
                          disabled={currentCategoryPage === 1}
                        >
                          <i className="fa fa-angle-left text-primary mr-2" />
                          <i className="fa fa-angle-left text-primary mr-2" />
                        </a>
                      </li>
                      {categoryPageNumbers.map((pageNumber) => (
                        <li className="page-item" key={pageNumber}>
                          <a
                            className={`page-link page-number-button ${pageNumber === currentCategoryPage ? 'active' : ''
                              }`}
                            onClick={() => handleCategoryPageClick(pageNumber)}
                          >
                            {pageNumber}
                          </a>
                        </li>
                      ))}
                      <li className="page-item">
                        <a
                          className="page-link"
                          onClick={handleNextCategoryPage}
                          disabled={endIndex >= categories.length}
                        >
                          <i className="fa fa-angle-right text-primary mr-2" />
                          <i className="fa fa-angle-right text-primary mr-2" />
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default MainNewsSlider