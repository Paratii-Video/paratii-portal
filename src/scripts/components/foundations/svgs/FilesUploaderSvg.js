import React, { Component } from 'react'
import styled from 'styled-components'

type Props = {}

const SVG = styled.svg`
  display: block;
  height: 100%;
  width: 100%;
`

class FilesUploaderSvg extends Component<Props, void> {
  render () {
    return (
      <SVG
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-590.901 1984 178.901 126.4"
      >
        <defs>
          <linearGradient
            id="a"
            x1="-.005"
            x2="1.003"
            y1=".501"
            y2=".501"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stopColor="#904cef" />
            <stop offset="1" stopColor="#7d70ff" />
          </linearGradient>
          <linearGradient
            id="b"
            x1="-.009"
            x2=".999"
            y1=".501"
            y2=".501"
            xlinkHref="#a"
          />
          <linearGradient id="c" x2=".999" y1=".533" y2=".533" xlinkHref="#a" />
          <linearGradient id="d" x2="1" y1=".533" y2=".533" xlinkHref="#a" />
          <linearGradient
            id="e"
            x2="1.008"
            y1=".501"
            y2=".501"
            xlinkHref="#a"
          />
          <linearGradient id="f" x2="1" y1=".5" y2=".5" xlinkHref="#a" />
          <linearGradient
            id="g"
            x1=".002"
            x2=".998"
            y1=".533"
            y2=".533"
            xlinkHref="#a"
          />
        </defs>
        <g>
          <path
            fill="#2F3057"
            d="M-450.901 2110.4h-121a12.035 12.035 0 0 1-12-12v-90a12.035 12.035 0 0 1 12-12h121a12.035 12.035 0 0 1 12 12v90a12.035 12.035 0 0 1-12 12z"
          />
        </g>
      </SVG>
    )
  }
}

export default FilesUploaderSvg
