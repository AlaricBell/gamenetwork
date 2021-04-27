export default function About() {
    return (
        <div className="container container-about">
            <div className="row">
                <div className="col-12 col-lg-6 container-about-content" data-aos="fade-right">
                    <h3>Follow your progress</h3>
                    <h2>We provide detailed profile data overview to make it easier for you.</h2>
                    <hr/>
                    <h4>Easy to keep track</h4>
                    <p>No useless data, we only provide what is truly relevant to you.</p>
                    <h4>Get the latest updates</h4>
                    <p>Frequently updated database ensures the up to date data.</p>
                </div>
                <div className="col-12 col-lg-6 container-about-img" data-aos="fade-left">
                    <img src="/img/showcase_overview.png" alt="" style={{width: '100%', height: '100%'}}/>
                </div>
            </div>

            <div className="row pb-0 reversable">
                <div className="col-12 col-lg-6 container-about-img" data-aos="fade-right">
                    <img src="/img/showcase_season.png" alt="" style={{width: '100%', height: '100%'}}/>
                </div>
                <div className="col-12 col-lg-6 container-about-content" data-aos="fade-left">
                    <h3>Seasonal performance overview</h3>
                    <h2>Check out our easy to understand seasonal data your favorite players.</h2>
                    <hr/>
                    <h4>Only the played seasons are present.</h4>
                    <p>You won't find irelevant data here, only the relevant ones are present.</p>
                    <h4>Epic visual representation.</h4>
                    <p>Getting confused easily? We do everything for our data to be easily understandable.</p>
                </div>
            </div>
        </div>
    )
}