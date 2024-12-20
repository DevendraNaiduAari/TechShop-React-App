import React from "react";
import { footMenu, footSocial } from "./footerData";
import servicesData from "./servicesData";

const Footer = () => {
    return (
        <footer className="text-white" style={{ backgroundColor: "#000", width: "100%" }}>
            <div className="container-fluid p-5 bg-dark">
                <h2 className="text-center mb-5"><b>Our Advantages</b></h2>
                <div className="row text-center justify-content-center" style={{ marginTop: "80px" }}>
                    {servicesData.map((service) => (
                        <div key={service.id} className="col-md-3 d-flex align-items-center mb-4">
                            <div className="me-3 fs-2 text-danger">{service.icon}</div>
                            <div>
                                <h6 className="mb-1 text-white text-start"><b>{service.title}</b></h6>
                                <p className="text-secondary mb-0">{service.info}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <section className="bg-black">
                <div className="row mt-5 text-start" style={{ width: "100%" }}>
                    {footMenu.map((menu) => (
                        <div key={menu.id} className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold"><b>{menu.title}</b></h6>
                            {menu.menu.map((item) => (
                                <p key={item.id}>
                                    <a className="text-secondary text-decoration-none" href={item.path}>
                                        {item.link}
                                    </a>
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            <hr className="my-3 bg-black" />

            <section className="p-3 pt-0 bg-black">
                <div className="row d-flex align-items-center">
                    <div className="col-md-7 col-lg-8 text-center text-md-start">
                        <div className="p-3">2024 | All Rights Reserved. Build by | A Devendra Naidu</div>
                    </div>

                    <div className="col-md-4 col-lg-4 ml-lg-0 text-center">
                        {footSocial.map((social) => (
                            <a key={social.id} className="btn btn-none btn-floating m-2 text-white" role="button" href={social.path}>{social.icon}</a>
                        ))}
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
