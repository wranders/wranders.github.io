import React from 'react';
import PropTypes from 'prop-types';

const GithubLogo = ({
    style = {},
    fill = "#000",
    width = "100%",
    className = "",
    viewBox = "0 0 257 257"
}) => (
<svg
    width = { width }
    height = { width }
    style = { style }
    viewBox = { viewBox }
    className = { `${className || ""}` }
    xmlns="http://www.w3.org/2000/svg" 
>
<path
    fill = { fill }
    d="
    M 128 0
    C 57.28125 0 0 57.28125 0 128
    C 0 184.640625 36.640625 232.480469 87.519531 249.441406
    C 93.921875 250.558594 96.320312 246.71875 96.320312 243.359375
    C 96.320312 240.320312 96.160156 230.238281 96.160156 219.519531
    C 64 225.441406 55.679688 211.679688 53.121094 204.480469
    C 51.679688 200.800781 45.441406 189.441406 40 186.398438
    C 35.519531 184 29.121094 178.078125 39.839844 177.921875
    C 49.921875 177.761719 57.121094 187.199219 59.519531 191.039062
    C 71.039062 210.398438 89.441406 204.960938 96.800781 201.601562
    C 97.921875 193.28125 101.28125 187.679688 104.960938 184.480469
    C 76.480469 181.28125 46.71875 170.238281 46.71875 121.28125
    C 46.71875 107.359375 51.679688 95.839844 59.839844 86.878906
    C 58.558594 83.679688 54.078125 70.558594 61.121094 52.960938
    C 61.121094 52.960938 71.839844 49.601562 96.320312 66.078125
    C 106.558594 63.199219 117.441406 61.761719 128.320312 61.761719
    C 139.199219 61.761719 150.078125 63.199219 160.320312 66.078125
    C 184.800781 49.441406 195.519531 52.960938 195.519531 52.960938
    C 202.558594 70.558594 198.078125 83.679688 196.800781 86.878906
    C 204.960938 95.839844 209.921875 107.199219 209.921875 121.28125
    C 209.921875 170.398438 180 181.28125 151.519531 184.480469
    C 156.160156 188.480469 160.160156 196.160156 160.160156 208.160156
    C 160.160156 225.28125 160 239.039062 160 243.359375
    C 160 246.71875 162.398438 250.71875 168.800781 249.441406
    C 219.359375 232.480469 256 184.480469 256 128
    C 256 57.28125 198.71875 0 128 0
    Z
    M 128 0 "/>
</svg>
)

GithubLogo.propTypes = {
    style: PropTypes.any,
    fill: PropTypes.string,
    width: PropTypes.string,
    className: PropTypes.string,
    viewBox: PropTypes.string
}

export default GithubLogo;