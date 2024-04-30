import React, { useState } from "react";
import styled from "styled-components";

const bodyBgColor = "#fafafa";
const pageBgColor = "#f5f5f5";
const darkTextColor = "#2a2935";
const baseline = "12px";
const bookTitleFont = "'Tulpen One', sans-serif";
const titleFont = "'Cormorant Garamond', serif";
const baseSize = `calc(${baseline} * 1.2)`;

const SnackListBlock = styled.div`
  :root {
    /* colors */
    --body-bg: ${bodyBgColor};
    --page-bg: ${pageBgColor};
    --dark-text: ${darkTextColor};

    /* spacing */
    --baseline: ${baseline};

    /* fonts */
    --book-title: ${bookTitleFont};
    --title: ${titleFont};
    --base-size: ${baseSize};
  }

  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${bodyBgColor};
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .cover {
    width: calc(${baseline} * 60);
    height: calc(${baseline} * 42.6);
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.3);
  }

  .book {
    width: 100%;
    height: 100%;
    display: flex;
    perspective: 1200px;

    &__page {
      position: relative;
      width: 50%;
      height: 100%;
      display: grid;
      transform: rotateY(0deg);
      transition: transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 0% 0%;
      background-color: ${pageBgColor};
      background-image: linear-gradient(
        90deg,
        rgba(227, 227, 227, 1) 0%,
        rgba(247, 247, 247, 0) 18%
      );

      &:nth-of-type(1) {
        background-image: linear-gradient(
          -90deg,
          rgba(227, 227, 227, 1) 0%,
          rgba(247, 247, 247, 0) 18%
        );
      }

      &--1 {
        cursor: pointer;
        overflow: hidden;

        img {
          width: 100%;
          max-width: 100%;
          height: auto;
        }
      }

      &--2 {
        position: absolute;
        right: 0;
        pointer-events: none;
        transform-style: preserve-3d;
        background-color: ${pageBgColor};
        background-image: linear-gradient(
          90deg,
          rgba(227, 227, 227, 1) 0%,
          rgba(247, 247, 247, 0) 18%
        );
      }

      &--4 {
        cursor: pointer;
        padding: 0 calc(${baseline} * 3);
      }

      &-front {
        position: absolute;
        width: 100%;
        height: 100%;
        transform: rotateY(0deg) translateZ(1px);
      }

      &-back {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 0 calc(${baseline} * 1.8);
        transform: rotateY(180deg) translateZ(1px);
      }

      .page__content {
        padding: ${baseline};
        height: 100%;
        position: relative;
        text-align: center;

        &-book-title {
          font-family: var(--book-title);
          font-size: calc(${baseSize} * 3);
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: ${darkTextColor};
          margin-top: calc(${baseline} * 5);
          margin-bottom: calc(${baseline} * 2);
        }

        &-author {
          font-family: var(--title);
          font-size: calc(${baseSize} * 1.2);
          font-weight: 100;
          text-transform: uppercase;
          color: ${darkTextColor};
          border-top: 1px solid ${darkTextColor};
          border-bottom: 1px solid ${darkTextColor};
          display: inline-block;
          padding: calc(${baseline} / 2) calc(${baseline} / 5);
          margin-bottom: calc(${baseline} * 6);
        }

        &-credits {
          font-family: var(--title);
          text-transform: uppercase;
          font-size: calc(${baseSize} * 0.8);
          margin-bottom: calc(${baseline} * 2);
          letter-spacing: 1px;

          span {
            display: block;
            font-size: calc(${baseSize} * 1.2);
            letter-spacing: 0;
          }
        }

        &-copyright {
          position: absolute;
          width: calc(100% - (${baseline}* 2));
          bottom: calc(${baseline} * 2);
          font-family: var(--title);
          font-size: calc(${baseSize} * 0.8);
          text-transform: uppercase;
        }

        &-title {
          font-family: var(--title);
          font-size: calc(${baseSize} * 1);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: calc(${baseline} * 5);
          margin-bottom: calc(${baseline} * 3);
        }

        &-table {
          width: 100%;
          margin-top: calc(${baseline} * 2);

          td {
            font-family: var(--title);
            font-size: calc(${baseSize} * 1);
            padding-bottom: calc(${baseline} * 1.5);
            text-transform: uppercase;
          }
        }

        &-blockquote {
          margin-bottom: calc(${baseline} * 2);
        }

        &-blockquote-text {
          font-family: var(--title);
          font-size: calc(${baseSize} * 0.67);
          font-style: italic;
          text-align: justify;
        }

        &-blockquote-reference {
          font-family: var(--title);
          font-size: calc(${baseSize} * 0.7);
          margin-top: calc(${baseline} * 0.3);
          float: right;
          text-transform: uppercase;
        }

        &-text {
          font-family: var(--title);
          font-size: calc(${baseSize} * 0.67);
          text-align: justify;
          text-indent: ${baseline};
        }
      }
      .page__number {
        position: absolute;
        bottom: ${baseline};
        width: calc(100% - (${baseline} * 2));
        font-family: var(--title);
        font-size: calc(${baseSize} * 0.67);
        text-align: center;
      }
    }

    input[type="radio"] {
      display: none;

      &:checked + .book__page {
        transition: transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform: rotateY(-180deg);
      }
    }
  }
`;

const SnackList = () => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };
  return (
    <SnackListBlock>
      <div class="cover">
        <div class="book">
          <label for="page-1" class="book__page book__page--1">
            {/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/193203/1111.jpg" alt=""> */}
            <img src="./assets/image/homeSnack/home_img1.png" alt="" />
          </label>

          <label for="page-2" class="book__page book__page--4">
            <div class="page__content">
              <h1 class="page__content-title">I</h1>
              <div class="page__content-blockquote">
                <p class="page__content-blockquote-text">
                  HARI SELDON — . . . born in the 11,988th year of the Galactic
                  Era; died 12,069. The dates are more commonly given in terms
                  of the current Foundational Era as -79 to the year 1 F.E. Born
                  to middle-class parents on Helicon, Arcturus sector (where his
                  father, in a legend of doubtful authenticity, was a tobacco
                  grower in the hydroponic plants of the planet), he early
                  showed amazing ability in mathematics. Anecdotes concerning
                  his ability are innumerable, and some are contradictory. At
                  the age of two, he is said to have. . .{" "}
                </p>
                <p class="page__content-blockquote-text">
                  . . . Undoubtedly his greatest contributions were in the field
                  of psychohistory. Seldon found the field little more than a
                  set of vague axioms; he left it a profound statistical
                  science. . . .{" "}
                </p>
                <p class="page__content-blockquote-text">
                  . . . The best existing authority we have for the details of
                  his life is the biography written by Gaal Dornick who, as a
                  young man, met Seldon two years before the great
                  mathematician's death. The story of the meeting . . .
                </p>
                <span class="page__content-blockquote-reference">
                  Encyclopedia Galactica*
                </span>
              </div>
              <div class="page__content-text">
                <p>
                  His name was Gaal Dornick and he was just a country boy who
                  had never seen Trantor before. That is, not in real life. He
                  had seen it many times on the hyper-video, and occasionally in
                  tremendous three-dimensional newscasts covering an Imperial
                  Coronation or the opening of a Galactic Council. Even though
                  he had lived all his life on the world of Synnax, which
                  circled a star at the edges of the Blue Drift, he was not cut
                  off from civilization, you see. At that time, no place in the
                  Galaxy was.{" "}
                </p>

                <p>
                  There were nearly twenty-five million inhabited planets in the
                  Galaxy then, and not one but owed allegiance to the Empire
                  whose seat was on Trantor. It was the last half-century in
                  which that could be said.{" "}
                </p>
                <p>
                  To Gaal, this trip was the undoubted climax of his young,
                  scholarly life. He had been in space before so that the trip,
                  as a voyage and nothing more, meant little to him. To be sure,
                  he had traveled previously only as far as Synnax's only
                  satellite in order to get the data on the mechanics of meteor
                  driftage which he needed for his dissertation, but
                  space-travel was all one whether one travelled half a million
                  miles, or as many light years.{" "}
                </p>
              </div>
              <div class="page__number">3</div>
            </div>
          </label>

          {/* <!-- Resets the page --> */}
          <input type="radio" name="page" id="page-1" />

          {/* <!-- Goes to the second page --> */}
          <input type="radio" name="page" id="page-2" />
          <label class="book__page book__page--2">
            <div class="book__page-front">
              <div class="page__content">
                <h1 class="page__content-book-title">Foundation</h1>
                <h2 class="page__content-author">Isaac Asimov</h2>

                <p class="page__content-credits">
                  Introduction by
                  <span>Paul Krugman</span>
                </p>

                <p class="page__content-credits">
                  Illustrations by
                  <span>Alex Wells</span>
                </p>

                <div class="page__content-copyright">
                  <p>The Folio Society</p>
                  <p>London - MMXII</p>
                </div>
              </div>
            </div>
            <div class="book__page-back">
              <div class="page__content">
                <h1 class="page__content-title">Contents</h1>
                <table class="page__content-table">
                  <tr>
                    <td align="left">Part I</td>
                    <td align="left">The Psycohistorians</td>
                    <td align="right">3</td>
                  </tr>
                  <tr>
                    <td align="left">Part II</td>
                    <td align="left">The Encyclopedists</td>
                    <td align="right">43</td>
                  </tr>
                  <tr>
                    <td align="left">Part III</td>
                    <td align="left">The Mayors</td>
                    <td align="right">87</td>
                  </tr>
                  <tr>
                    <td align="left">Part IV</td>
                    <td align="left">The Traders</td>
                    <td align="right">147</td>
                  </tr>
                  <tr>
                    <td align="left">Part V</td>
                    <td align="left">The Merchant Princes</td>
                    <td align="right">173</td>
                  </tr>
                </table>

                <div class="page__number">2</div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </SnackListBlock>
  );
};

export default SnackList;
