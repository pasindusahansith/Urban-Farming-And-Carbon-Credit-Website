import React from 'react';
import Navbar from '../components/Navbar';
import '../Assest/css/Dashboard.css';
import '../Assest/FA 6.4.0 Pro/css/all.min.css';
import AboutUs_Container from '../components/aboutUs_Container';
import overView_Image from '../Assest/images/urban_farming_overview.jpg';
import organicPlantMagicImg from '../Assest/images/Product_01.webp';
import ProduceSalesOverView_card from '../components/ProduceSalesOverView_card.js';
import hydrooponicTower from '../Assest/images/product_02.jpeg';
import verticalGardnen from '../Assest/images/Product_03.jpeg';
import GaugeLeave from '../components/OverViewGadge.js';
import Review from '../components/Review.js';
import Footer from '../components/Footer.js';
import Login from './login.js';
import { useNavigate } from 'react-router-dom';

function Dashboard (){
    const mission="Mission";
    const missinPara="Our mission is to empower urban farmers, promote sustainability, and create an ecosystem where environmental efforts translate into financial benefits through carbon credits.";
    const vision="Vision";
    const visionPara="Our vision is a world where urban farming is integrated into every city, reducing carbon footprints and creating thriving communities.";
    const partners="Partners";
    const partnerPara="We partner with businesses, government organisation, and non-profits that share our goal of a more sustainable world. Together, we work to support urban farming, reduce carbon emissions, and make a positive impact on the environment and local communities.";
    const organicPlantMagicTitle="Organic Plant Magic";
    const organicPlantMagicDiscription="There is just enough space here for several lines of text. Use it well.";
    const hydrooponicTowerTitle="Hydroponic tower";
    const hydrooponicTowerDiscription="There is just enough space here for several lines of text. Use it well.";
    const verticalGardnenTitle="Plant Composting Vertical Garden Planter";
    const verticalGardnenDiscription="There is just enough space here for several lines of text. Use it well.";
    const gaugeSettings = {
        value: 19, 
        min: 0, 
        max: 100,
      };
    const corporateparnershipTitle="Corporate Partnerships:";
    const corporateparnershipDiscription="There is just enough space here for several lines of text. Use it well.";
    const GovernmentCollaborationsTitle="Government Collaborations:"
    const GovernmentCollaborationDiscription="There is just enough space here for several lines of text. Use it well.";
    const CommunityTitle="Non-Profit and Community Partnerships:";
    const CommunityDiscription="There is just enough space here for several lines of text. Use it well.";
    const Review01="“Urban Farming is fantastic! Their commitment to sustainability and carbon credits is inspiring. The team is knowledgeable and passionate. Highly recommend them for their innovative approach and excellent service. Thank you, Urban Farming!”";
    const ReviewName01="- Aisha";
    const Review02="“Urban Farming is a game-changer! Their dedication to sustainability and innovative use of carbon credits is remarkable. The team is friendly and knowledgeable. Thank you, Urban Farming!”";
    const ReviewName02="- Liam";
    const Review03="“Urban Farming exceeded my expectations! Their sustainable practices and carbon credit initiatives are truly commendable. The staff is knowledgeable and passionate. Thank you, Urban Farming!”";
    const ReviewName03="- Isabella";
    const Review04="Urban Farming exceeded my expectations! Their sustainable practices and carbon credit initiatives are truly commendable. The staff is knowledgeable and passionate. Thank you, Urban Farming!”";
    const ReviewName04="-Rayan";
    const navigate = useNavigate();
    const handleLogout = () => {
    navigate("/login"); 
    };


    return(
        <div>
            <div className='navbarDashboard'>
                <Navbar/>
            </div>
            <div id="home" className='bg'>
                <div className='bgColour'>
                    <div className='banner'>
                        <div className='topBannerLeft'>
                            <div className='greenCredit'>
                                <h1 className='green'>
                                    Green
                                </h1>
                                <h1 className='credit'>
                                    Credit
                                </h1>
                            </div>     
                        </div>
                        <div className='topBannerRight'>
                            <button onClick={handleLogout}> 
                                <i className="fa-solid fa-user fa-xl"></i> Join with us ...
                            </button>
                        </div>

                    </div>
                    <div className='bannerBottom'>
                        <p className='firsrParagraph'>
                        "Empowering Urban Farming &<br/>
                        Sustainability through Carbon<br/>
                        Credits."
                        </p>
                        <p className='secondParagraph'>
                        Join a community dedicated to urban farming, sustainability, and<br/>
                        carbon credit trading
                        </p>
                    </div>
              </div>
            </div>
            <div id="about" className='about'>
                <div className='aboutUs'>
                    ABOUT US
                </div>
                <div className='mission'>
                    <AboutUs_Container
                        heading={mission}
                        paragraph={missinPara}
                    />
                </div>
                <div className='Vision'>
                    <AboutUs_Container
                        heading={vision}
                        paragraph={visionPara}
                    />
                </div>
                <div className='partner'>
                    <AboutUs_Container
                        heading={partners}
                        paragraph={partnerPara}
                    />
                </div>
            </div>
            <div id="urbanFarming" className='overView'>
                <div className='overViewImage'>
                    <img src={overView_Image} className='overView_Image'>
                    </img>
                </div>
                <div className='overViewDiscription'>
                    <div className='overViewHeading'>
                        <h1>
                        Urban Farming Overview
                        </h1>
                    </div>
                    <div className='importance'>
                        <p className='overViewTopic_01'>
                        CONCEPT OF URBAN FARMING AND ITS IMPORTANCE
                        </p>
                        <p className='overViewPara_01'>
                        Urban farming is revolutionizing how we grow food in cities, 
                        helping individuals and communities make a positive impact on the environment. 
                        Learn how you can start growing fresh produce and contribute to a more sustainable future.
                        </p>
                    </div>
                    <div className='resources'>
                        <p className='overViewTopic_02'>
                            URBAN FARMING TOLLS & RESOURCES
                        </p>
                        <p className='overViewPara_02'>
                        The Tools & Resources section provides essential tools, guides, and tips 
                        to help you start and maintain your urban farm.
                        </p>
                        <button className='btnShopNow'>
                            SHOP NOW...
                        </button>
                    </div>
                </div>
            </div>
            <div id="produceSales" className='produceSalesOverView'>
                <div className='produceSalesTopic'>
                    <h1>
                        Produce Sales Overview
                    </h1>
                </div>
                <div className='produceOverViewContainer'>
                    <p className='overViewText'>
                    Discover our unique produce-related services or listings, including opportunities to engage in urban farming markets and explore related products and services.
                    </p>
                </div>
                <div className='overViewCards'>
                <ProduceSalesOverView_card
                    organicPlantMagicImg={organicPlantMagicImg}
                    cardHeading={organicPlantMagicTitle}
                    cardDiscription={organicPlantMagicDiscription}
                    cardHeadingColor="#000000"
                    borderRadius={false}
     
                />

                <ProduceSalesOverView_card
                    organicPlantMagicImg={hydrooponicTower}
                    cardHeading={hydrooponicTowerTitle}
                    cardDiscription={hydrooponicTowerDiscription}
                    cardHeadingColor="#000000"
                    borderRadius={false}
                />

                <ProduceSalesOverView_card
                    organicPlantMagicImg={verticalGardnen}
                    cardHeading={verticalGardnenTitle}
                    cardDiscription={verticalGardnenDiscription}
                    cardHeadingColor="#000000"
                    borderRadius={false}
                />
                </div>
                <button className='btnProductSalesOverview'>
                    Shop More ...
                </button>
            </div>
            <div id="carbonCredit" className='CarbonCreditOverView'>
                <div className='topicAndGadge'>
                    <div className='CrabonCreditOverViewTopic'>
                        <h1>
                            Carbon Credit Overview
                        </h1>
                        <div className='gadge'>
                        <GaugeLeave settings={gaugeSettings} />
                        </div>
                    </div>
                        <div className='gadgeDiscriptionAndButton'>
                            <p>
                            Carbon credits are certificates that represent the reduction of one metric ton of CO₂ emissions. They are earned through activities that lower or offset greenhouse gas emissions, such as reforestation or renewable energy projects. The purpose of carbon credits is to help reduce global greenhouse gas emissions by incentivizing organizations and individuals to engage in eco-friendly practices. Once emissions reductions are verified, credits are issued and can be traded in marketplaces, allowing companies to offset their carbon footprint by purchasing credits from projects that reduce or remove emissions.
                            </p>
                            <button className='btnCarbonCreditOverView' onClick={() => navigate('/CarbonCredit')}>
                                LEARN MORE ...
                            </button>
                        </div>
                </div>
            </div>
            <div id="partnership" className='UrbanFarmingPartnrship'>
                <div className='UrbanFarmingPartnrshipTopic'>
                    <h1>
                        Urban Farming Partnrship
                    </h1>
                </div>
                <div className='parnershipCards'>
                <ProduceSalesOverView_card
                    organicPlantMagicImg={organicPlantMagicImg}
                    cardHeading={corporateparnershipTitle}
                    cardDiscription={corporateparnershipDiscription}
                    cardHeadingColor="#ffffff"
                    borderRadius={false}
     
                />

                <ProduceSalesOverView_card
                    organicPlantMagicImg={hydrooponicTower}
                    cardHeading={GovernmentCollaborationsTitle}
                    cardDiscription={GovernmentCollaborationDiscription}
                    cardHeadingColor="#ffffff"
                    borderRadius={false}
     
                />

                <ProduceSalesOverView_card
                    organicPlantMagicImg={verticalGardnen}
                    cardHeading={CommunityTitle}
                    cardDiscription={CommunityDiscription}
                    cardHeadingColor="#ffffff"
                    borderRadius={false}
                />
                </div>
            </div>
            <div id="projects" className='OurProjects'>
                <div className='OurProjectsTopic'>
                    <h1>
                        OUR PROJECTS
                    </h1>
                </div>
                <div className='ProjectsCards'>
                <ProduceSalesOverView_card
                    organicPlantMagicImg={organicPlantMagicImg}
                    cardHeading={corporateparnershipTitle}
                    cardDiscription={corporateparnershipDiscription}
                    cardHeadingColor="#ffffff"
                    borderRadius={true}
     
                />

                <ProduceSalesOverView_card
                    organicPlantMagicImg={hydrooponicTower}
                    cardHeading={GovernmentCollaborationsTitle}
                    cardDiscription={GovernmentCollaborationDiscription}
                    cardHeadingColor="#ffffff"
                    borderRadius={true}
     
                />

                <ProduceSalesOverView_card
                    organicPlantMagicImg={verticalGardnen}
                    cardHeading={CommunityTitle}
                    cardDiscription={CommunityDiscription}
                    cardHeadingColor="#ffffff"
                    borderRadius={true}
                />
                </div>
            </div>
            <div id="reviews" className='ReviewsContainer'>
                <div className='bgImage_reviews'>
                    <div className='ReviewTopicContainer'>
                        <p className='ReviewTopic'>
                            REVIEWS
                        </p>
                    </div>
                    <div className='ReviewColomns'>
                        <div className='ReviewFirstColomn'>
                            <Review
                                ReviewDiscription={Review01}
                                ReviewerName={ReviewName01}
                            />
                            <Review
                                ReviewDiscription={Review02}
                                ReviewerName={ReviewName02}
                            />
                        </div>
                        <div className='ReviewSecondColomn'>
                            <Review
                                ReviewDiscription={Review03}
                                ReviewerName={ReviewName03}
                            />
                            <Review
                                ReviewDiscription={Review04}
                                ReviewerName={ReviewName04}
                            />
                        </div>
                    </div>             
                </div>
            </div>
            <div id="contact" className='Footer'>
                <Footer />
            </div>
        </div>
    )

}
export default Dashboard;