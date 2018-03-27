import React, { Component } from 'react'
import Button from '../foundations/Button'
import Title from '../foundations/Title'
import Text from '../foundations/Text'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  max-width: 710px;
  width: 100%;
`

const SVG = styled.svg`
  display: block;
  margin: 90px 0 45px;
  width: 100%;
`

type Props = {
  children: any
}

const NavLink = Button.withComponent('a')

class NotFound extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        <Title purple>Oooooops, video not found!</Title>
        <Text gray>{this.props.children}</Text>
        <SVG viewBox="1644 3231.982 710.6 165.593">
          <defs>
            <linearGradient
              id="a"
              x2=".274"
              y2="1"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stopColor="#9149ef" />
              <stop offset=".291" stopColor="#8365fb" />
              <stop offset="1" stopColor="#7d70ff" />
            </linearGradient>
          </defs>
          <g>
            <path
              fill="#3f3d88"
              d="M2122.84 3397.575v-11.56a2.7 2.7 0 0 1 2.688-2.688h17.743v-13.575a2.7 2.7 0 0 1 2.688-2.688h8.065l13.643-68.416c-49.2 9.207-107.127 15.794-169.36 18.549-61.7 2.755-119.695 1.344-169.36-3.293l10.551 53.16h8.065a2.7 2.7 0 0 1 2.688 2.688v13.576h17.743a2.7 2.7 0 0 1 2.688 2.688v11.56s-192.816-.135-192.682-.001v-42.542a2.7 2.7 0 0 1 2.688-2.688h6.049v-31.184a2.7 2.7 0 0 1 2.688-2.688c0-.2 55.445 0 55.445 0a2.7 2.7 0 0 1 2.688 2.688v31.184h16.735l21.307-107.194a2.661 2.661 0 0 1 2.619-2.151h24.261a2.608 2.608 0 0 1 2.62 2.151l5.981 29.974c50.943 5.108 110.958 6.721 175.006 3.9 66.534-2.957 128.163-10.35 179.509-20.5l2.621-13.307a2.661 2.661 0 0 1 2.622-2.151h24.261a2.608 2.608 0 0 1 2.621 2.151l21.372 107.127h4.637v-42.138a2.7 2.7 0 0 1 2.688-2.688h71.709a2.7 2.7 0 0 1 2.688 2.688v42.071h7.594a2.7 2.7 0 0 1 2.688 2.688v42.609z"
              data-name="Path 390"
              opacity=".28"
            />
            <path
              fill="url(#a)"
              d="M709.2 160.354H690v-42.815a3.876 3.876 0 0 0-3.841-3.841h-6.849V70.464a3.876 3.876 0 0 0-3.841-3.841h-74.525a3.876 3.876 0 0 0-3.841 3.841V113.7h-2.933l-12.922-64.748c.838-.21 1.676-.419 2.445-.629a4.083 4.083 0 0 0 2.584-1.956 4.323 4.323 0 0 0 .419-3.213l-9.15-32.129a4.156 4.156 0 0 0-4.4-3l-.978-4.749A3.818 3.818 0 0 0 568.4.2h-25.218a3.888 3.888 0 0 0-3.772 3.073l-2.51 12.782c-54.692 10.826-119.229 18.229-185.791 21.233-64.117 2.864-126.768 1.467-180.968-3.981l-6.006-30.034A3.818 3.818 0 0 0 160.363.2h-25.214a3.888 3.888 0 0 0-3.772 3.073L126.419 28a4.15 4.15 0 0 0-3.492 3.422l-5.518 32.757a4.163 4.163 0 0 0 .7 3.143 3.038 3.038 0 0 1 .419.489l-9.15 45.958H95.617V79.613a3.876 3.876 0 0 0-3.841-3.841H32.338a3.876 3.876 0 0 0-3.838 3.841v34.154h-5.242a3.876 3.876 0 0 0-3.841 3.841v42.815H1.4a1.4 1.4 0 0 0 0 2.794h707.8a1.4 1.4 0 0 0 1.4-1.4 1.463 1.463 0 0 0-1.4-1.463zm-23.049-44.561a1.729 1.729 0 0 1 1.746 1.746V160.7h-18.645v-44.91zm-19 0V160.7h-16.408v-44.91h16.414zM621.129 160.7v-44.91h27.519v44.91zm27.1-91.985h14.039v19.07l-1.956-2.514a.965.965 0 0 0-.768-.419 1.157 1.157 0 0 0-.838.349l-3.353 3.841-2.653-3.771a.965.965 0 0 0-.768-.419.94.94 0 0 0-.838.349l-2.864 3V68.718zm-12.013 0h9.918v22.074a1.1 1.1 0 0 0 .629.978.965.965 0 0 0 1.117-.279l3.772-3.981 2.724 3.841a1 1 0 0 0 .838.419 1.157 1.157 0 0 0 .838-.349l3.353-3.911 3.073 3.841a1 1 0 0 0 .838.419.63.63 0 0 0 .349-.07 1.05 1.05 0 0 0 .7-.978v-22h11.105a1.729 1.729 0 0 1 1.746 1.746v43.164h-41V68.718zM599.2 70.464a1.729 1.729 0 0 1 1.746-1.746h33.174v44.91H599.2zm19.836 45.329V160.7h-31.083v-43.161a1.729 1.729 0 0 1 1.746-1.746zM589.7 113.7a3.876 3.876 0 0 0-3.841 3.841v11.455H516.5l4.749-24.027h69.007L592 113.7h-2.3zm-85.63 34.294h81.858V160.7H483.954v-10.963a1.729 1.729 0 0 1 1.746-1.746zm11.105-16.9h70.753V145.9h-80.81v-13.065a1.729 1.729 0 0 1 1.746-1.746zm10.756-49.45l3.492-17.6h52.733l3.492 17.6zm15.575-78.022a1.733 1.733 0 0 1 1.746-1.4h25.214a1.788 1.788 0 0 1 1.746 1.4l.978 4.819c-10.2 2.514-20.884 4.889-31.989 7.124zm31.64 7.124a1.411 1.411 0 0 1 1.676.978l9.15 32.129a1.354 1.354 0 0 1-.14 1.048 1.246 1.246 0 0 1-.838.629c-50.288 13.2-113.218 22.909-180.758 28.217l-2.026-36.809c63.908-5.029 124.044-14.038 172.936-26.191zm-221.9 29.2q23.363-1.048 46.237-2.794l2.026 36.878q-22.839 1.781-46.167 2.794-22.63 1.048-44.84 1.327l-2.1-36.878q22.217-.319 44.847-1.331zM133.473 3.553a1.732 1.732 0 0 1 1.746-1.4h25.214a1.788 1.788 0 0 1 1.746 1.4l5.867 29.4c-13.69-1.4-26.89-3.073-39.392-4.959zM120.133 64.6l5.518-32.757a1.363 1.363 0 0 1 1.606-1.118c50.358 7.683 111.682 11.315 176.358 10.547l2.025 36.878c-68.308.838-132.5-3.283-184.32-12.013a1.553 1.553 0 0 1-.908-.559 1.6 1.6 0 0 1-.279-.978zm.279 4.261c.14.07.279.07.419.14 17.321 2.864 35.97 5.308 55.666 7.124l1.118 5.518H117.9zm-7.194 36.11h69.076l4.749 23.957h-63.488v-11.459a3.876 3.876 0 0 0-3.841-3.841h-8.172zm83.464 26.052a1.729 1.729 0 0 1 1.746 1.746v13.061h-74.873v-14.811h73.127zm21.233 16.9a1.729 1.729 0 0 1 1.746 1.746v10.966h-96.106v-12.713h94.36zm-98.2-32.129a1.729 1.729 0 0 1 1.746 1.746v43.16H54.688v-44.91zm-45.19-38h17.251a1.729 1.729 0 0 1 1.746 1.746v33.665h-19zm-18.229.14v15.02H43.024V77.937zm-25.7 1.606a1.729 1.729 0 0 1 1.742-1.74h8.521V94a1.074 1.074 0 0 0 1.048 1.048h15.366A1.074 1.074 0 0 0 58.32 94V77.8h14.039v35.411H30.592zm-9.08 38a1.729 1.729 0 0 1 1.746-1.746h29.331V160.7H21.512zm196.4 28.287h-17.392v-13.062a3.876 3.876 0 0 0-3.841-3.841h-7.473l-10.477-52.663c34.084 3.143 71.242 4.749 110.005 4.749 21.163 0 42.815-.489 64.676-1.467 62.3-2.794 122.438-9.359 174.542-19l-13.62 68.378h-7.473a3.876 3.876 0 0 0-3.841 3.841v13.061H485.63a3.876 3.876 0 0 0-3.841 3.841v10.616H221.757v-10.612a3.876 3.876 0 0 0-3.842-3.842zm109.306-80.392a.793.793 0 0 0 .559.21l8.661-.419.14 3.353a.527.527 0 0 0 .279.489.793.793 0 0 0 .559.21l2.235-.14a.527.527 0 0 0 .489-.279.793.793 0 0 0 .21-.559l-.21-3.283 2.375-.14a.527.527 0 0 0 .489-.279.793.793 0 0 0 .21-.559l-.07-1.956a.527.527 0 0 0-.279-.489.793.793 0 0 0-.559-.21l-2.375.14-.559-11.175a.527.527 0 0 0-.279-.489.793.793 0 0 0-.559-.21l-2.1.14a1.45 1.45 0 0 0-1.118.768l-8.032 11.105-.419.629a1.149 1.149 0 0 0-.14.7l.07 1.956c.214.208.284.352.423.487zm8.731-9.639l.279 5.937-4.749.21zm9.708 5.8a19 19 0 0 0 .629 3 5.542 5.542 0 0 0 1.4 2.3 6.235 6.235 0 0 0 2.375 1.467 8.884 8.884 0 0 0 3.492.419 9.515 9.515 0 0 0 3.422-.768 6.084 6.084 0 0 0 2.235-1.676A7.243 7.243 0 0 0 360.4 63.9a13.619 13.619 0 0 0 .349-3v-1.192c0-.419-.07-.838-.07-1.327 0-.419-.07-.908-.07-1.327s-.07-.838-.07-1.187a19 19 0 0 0-.629-3 6.377 6.377 0 0 0-1.4-2.3 6.235 6.235 0 0 0-2.375-1.467 8.883 8.883 0 0 0-3.492-.419 9.175 9.175 0 0 0-3.422.768 5.984 5.984 0 0 0-2.165 1.746 6.991 6.991 0 0 0-1.187 2.514 14.271 14.271 0 0 0-.349 3.073c0 .7 0 1.537.07 2.445a12.874 12.874 0 0 0 .071 2.366zm4.33-8.172a3.192 3.192 0 0 1 2.724-1.257 3.352 3.352 0 0 1 2.864.978 5.911 5.911 0 0 1 1.118 3.073 22.714 22.714 0 0 1 .14 2.3c.07.838.07 1.606.07 2.375a5.245 5.245 0 0 1-.838 3.143 3.193 3.193 0 0 1-2.724 1.257 3.129 3.129 0 0 1-2.794-.978 5.911 5.911 0 0 1-1.118-3.073 22.705 22.705 0 0 1-.14-2.3c-.07-.838-.07-1.606-.07-2.375a5.248 5.248 0 0 1 .769-3.145zM363.4 63.689a.793.793 0 0 0 .559.21l8.661-.419.14 3.353a.527.527 0 0 0 .279.489.793.793 0 0 0 .559.21l2.235-.14a.527.527 0 0 0 .489-.279.793.793 0 0 0 .21-.559l-.14-3.353 2.375-.14a.527.527 0 0 0 .489-.279.793.793 0 0 0 .21-.559l-.07-1.956a.527.527 0 0 0-.279-.489.793.793 0 0 0-.559-.21l-2.375.14-.559-11.175a.527.527 0 0 0-.279-.489.793.793 0 0 0-.559-.21l-2.1.14a1.45 1.45 0 0 0-1.117.768l-8.032 11.105-.419.629a1.148 1.148 0 0 0-.14.7l.07 1.956a3.9 3.9 0 0 0 .352.557zm8.731-9.708l.279 5.937-4.749.21z"
              data-name="Path 389"
              transform="translate(1644 3231.782)"
            />
          </g>
        </SVG>
        <Text gray>
          The video you are looking for doesn&apos;t exist. If you think
          it&apos;s a bug you can report it on our{' '}
          <NavLink
            href="https://github.com/Paratii-Video/"
            target="_blank"
            anchor
            purple
          >
            Github
          </NavLink>?
        </Text>
      </Wrapper>
    )
  }
}

export default NotFound