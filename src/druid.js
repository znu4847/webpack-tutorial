import Heading from "./components/heading/heading.js";
import DruidImage from "./components/druid-image/druid-image.js";
import _ from "lodash";

const heading = new Heading();
heading.render(_.upperFirst("druid"));

const druidImage = new DruidImage();
druidImage.render();
