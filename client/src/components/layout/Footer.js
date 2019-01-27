import React from "react";
import { Link } from "react-router-dom";
export default () => {
  return (
    <footer className="page-footer grey darken-3">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">StoryBooks</h5>
            <p className="grey-text text-lighten-4">
              Share your life with the world
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Links</h5>
            <ul>
              <li>
                <Link to="/public/stories" className="grey-text text-lighten-3">
                  Public Stories
                </Link>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="/about">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="container">
          Copyright &copy; {new Date().getFullYear()} StroyBooks
          <a className="grey-text text-lighten-4 right" href="#!">
            More Links
          </a>
        </div>
      </div>
    </footer>
  );
};
