// CSS perspective transform test for mobile/iPhone validation
const appBase = import.meta.env.BASE_URL;

export default function PerspectiveTest() {
  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "480px",
        margin: "40px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "24px" }}>CSS Perspective Test</h2>

      <p style={{ marginBottom: "8px", fontWeight: 600 }}>Base image</p>
      <div
        className="hero-wrapper"
        style={{
          width: "900px",
          height: "auto",
          position: "relative",
          marginBottom: "40px",
          border: "1px solid #1a1a1a",
          overflow: "hidden",
        }}
      >
        <img
          src={`${appBase}images/iphone-mock-001.jpg`}
          alt="test"
          style={{
            width: "100%",
            display: "block",
          }}
        />
        <div
          style={{
            perspective: "2000px",
            transform: "rotate(-22deg)",
            position: "absolute",
            top: "-12.9%",
            left: "37.5%",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={`${appBase}images/lime-mobile.png`}
            alt="test"
            style={{
              width: "26.5%",
              transform: "rotateX(9deg) rotateY(40deg)",
              display: "block",
              transformOrigin: "center center",
              transformStyle: "preserve-3d",
            }}
          />
        </div>
        <img
          src={`${appBase}images/iphone-mock-overlay-001.png`}
          alt="overlay"
          style={{
            width: "100%",
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            mixBlendMode: "multiply",
          }}
        />
      </div>

      <p style={{ color: "#888", fontSize: 13 }}>----------------</p>

      <div
        className="hero-wrapper"
        style={{
          width: "900px",
          height: "auto",
          position: "relative",
          marginBottom: "40px",
          border: "1px solid #1a1a1a",
          overflow: "hidden",
        }}
      >
        <img
          src={`${appBase}images/lhead-img-001.jpg`}
          alt="test"
          style={{
            width: "100%",
            display: "block",
          }}
        />
        <div
          className="perspective-test-2"
          style={{
            perspective: "2000px",
            transform: "rotate(-24deg)",
            position: "absolute",
            top: "-05.0%",
            left: "10.7%",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={`${appBase}images/lime-lh-001.png`}
            alt="test"
            style={{
              width: "35%",
              transform: "rotateX(25deg) rotateY(15deg)",
              display: "block",
              transformOrigin: "center center",
              transformStyle: "preserve-3d",
            }}
          />
        </div>
        <div
          className="perspective-test-1"
          style={{
            perspective: "2000px",
            transform: "rotate(29deg)",
            position: "absolute",
            top: "41.7%",
            left: "24.8%",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={`${appBase}images/hydromet-lh-001.png`}
            alt="test"
            style={{
              width: "35%",
              transform: "rotateX(21deg) rotateY(-7deg)",
              display: "block",
              transformOrigin: "center center",
              transformStyle: "preserve-3d",
            }}
          />
        </div>
        <img
          src={`${appBase}images/lhead-img-001-mix.png`}
          alt="overlay"
          style={{
            width: "100%",
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            mixBlendMode: "multiply",
          }}
        />
      </div>

      <p style={{ color: "#888", fontSize: 13 }}>----------------</p>

      <div
        className="hero-wrapper"
        style={{
          width: "900px",
          height: "auto",
          position: "relative",
          marginBottom: "40px",
          border: "1px solid #1a1a1a",
          overflow: "hidden",
        }}
      >
        <img
          src={`${appBase}images/bcard-img-001.jpg`}
          alt="test"
          style={{
            width: "100%",
            display: "block",
          }}
        />
        <div
          className="perspective-test-2"
          style={{
            perspective: "2000px",
            transform: "rotate(-29deg)",
            position: "absolute",
            top: "33%",
            left: "33.7%",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={`${appBase}images/hydromet-bcard-001.png`}
            alt="test"
            style={{
              width: "25%",
              transform: "rotateX(-9deg) rotateY(5deg)",
              display: "block",
              transformOrigin: "center center",
              transformStyle: "preserve-3d",
            }}
          />
        </div>
        <div
          className="perspective-test-1"
          style={{
            perspective: "2000px",
            transform: "rotate(27deg)",
            position: "absolute",
            top: "60.7%",
            left: "27.8%",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={`${appBase}images/hydromet-bcard-002.png`}
            alt="test"
            style={{
              width: "26%",
              transform: "rotateX(21deg) rotateY(-13deg)",
              display: "block",
              transformOrigin: "center center",
              transformStyle: "preserve-3d",
            }}
          />
        </div>
        <img
          src={`${appBase}images/bcard-img-001-mix.png`}
          alt="overlay"
          style={{
            width: "100%",
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            mixBlendMode: "multiply",
          }}
        />
      </div>

      <p style={{ color: "#888", fontSize: 13 }}>----------------</p>

      <div
        className="hero-wrapper"
        style={{
          width: "900px",
          height: "auto",
          position: "relative",
          marginBottom: "40px",
          border: "1px solid #1a1a1a",
          overflow: "hidden",
        }}
      >
        <img
          src={`${appBase}images/bcard-img-002.jpg`}
          alt="test"
          style={{
            width: "100%",
            display: "block",
          }}
        />
        <div
          className="perspective-test-2"
          style={{
            perspective: "2000px",
            transform: "rotate(0deg)",
            position: "absolute",
            top: "54.5%",
            left: "9.5%",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={`${appBase}images/hydromet-thumb.png`}
            alt="test"
            style={{
              width: "47%",
              transform: "rotateX(0deg) rotateY(0deg)",
              display: "block",
              transformOrigin: "center center",
              transformStyle: "preserve-3d",
            }}
          />
        </div>
        <div
          className="perspective-test-1"
          style={{
            perspective: "2000px",
            transform: "rotate(32deg)",
            position: "absolute",
            top: "31.5%",
            left: "24%",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={`${appBase}images/hydromet-bcard-001.png`}
            alt="test"
            style={{
              width: "45.5%",
              transform: "rotateX(0deg) rotateY(0deg)",
              display: "block",
              transformOrigin: "center center",
              transformStyle: "preserve-3d",
            }}
          />
        </div>
        <img
          src={`${appBase}images/bcard-img-002-mask.png`}
          alt="overlay"
          style={{
            width: "100%",
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            mixBlendMode: "multiply",
          }}
        />
      </div>

      <div
        className="hero-wrapper"
        style={{
          width: "900px",
          height: "auto",
          position: "relative",
          marginBottom: "40px",
          border: "1px solid #1a1a1a",
          overflow: "hidden",
        }}
      >
        <img
          src={`${appBase}images/dtop-computer-001.jpg`}
          alt="test"
          style={{
            width: "100%",
            display: "block",
          }}
        />
        <div
          className="perspective-test-2"
          style={{
            perspective: "2000px",
            transform: "rotate(0deg)",
            position: "absolute",
            top: "54.5%",
            left: "9.5%",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={`${appBase}images/transparent.png`}
            alt="test"
            style={{
              width: "47%",
              transform: "rotateX(0deg) rotateY(0deg)",
              display: "block",
              transformOrigin: "center center",
              transformStyle: "preserve-3d",
            }}
          />
        </div>
        <div
          className="perspective-test-1"
          style={{
            perspective: "2000px",
            transform: "rotate(32deg)",
            position: "absolute",
            top: "31.5%",
            left: "24%",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={`${appBase}images/transparent.png`}
            alt="test"
            style={{
              width: "45.5%",
              transform: "rotateX(0deg) rotateY(0deg)",
              display: "block",
              transformOrigin: "center center",
              transformStyle: "preserve-3d",
            }}
          />
        </div>

        <img
          src={`${appBase}images/transparent.png`}
          alt="overlay"
          style={{
            width: "100%",
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            mixBlendMode: "multiply",
          }}
        />
        <div
          className="video-wrapper"
          style={{
            position: "absolute",
            overflow: "hidden",
            top: "7.4%",
            left: "17.7%",
            width: "68%",
            height: "55%",
          }}
        >
          <video
            className="item-video"
            autoPlay
            loop
            playsInline
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            <source
              src={`${appBase}images/lime-web-001.mp4`}
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      <div
        className="hero-wrapper"
        style={{
          width: "900px",
          height: "auto",
          position: "relative",
          marginBottom: "40px",
          border: "1px solid #1a1a1a",
          overflow: "hidden",
        }}
      >
        <img
          src={`${appBase}images/white-wall.jpg`}
          alt="test"
          style={{
            width: "100%",
            display: "block",
          }}
        />
        <div
          className="perspective-test-2"
          style={{
            perspective: "2000px",
            transform: "rotate(0deg)",
            position: "absolute",
            top: "8%",
            left: "5%",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={`${appBase}images/DSC1862.jpg`}
            alt="test"
            style={{
              width: "43%",
              transform: "rotateX(0deg) rotateY(0deg)",
              display: "block",
              transformOrigin: "center center",
              transformStyle: "preserve-3d",
            }}
          />
        </div>
        <div
          className="perspective-test-1"
          style={{
            perspective: "2000px",
            transform: "rotate(0deg)",
            position: "absolute",
            top: "8%",
            left: "52%",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={`${appBase}images/DSC_3023_025.jpg`}
            alt="test"
            style={{
              width: "43%",
              transform: "rotateX(0deg) rotateY(0deg)",
              display: "block",
              transformOrigin: "center center",
              transformStyle: "preserve-3d",
            }}
          />
        </div>

        <img
          src={`${appBase}images/transparent.png`}
          alt="overlay"
          style={{
            width: "100%",
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            mixBlendMode: "multiply",
          }}
        />
      </div>

      <div
        className="hero-wrapper"
        style={{
          width: "900px",
          height: "auto",
          position: "relative",
          marginBottom: "40px",
          border: "1px solid #1a1a1a",
          overflow: "hidden",
        }}
      >
        <img
          src={`${appBase}images/white-wall.jpg`}
          alt="test"
          style={{
            width: "100%",
            display: "block",
          }}
        />
        <div
          className="perspective-test-2"
          style={{
            perspective: "2000px",
            transform: "rotate(0deg)",
            position: "absolute",
            top: "8%",
            left: "15%",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={`${appBase}images/DSCF6777.jpg`}
            alt="test"
            style={{
              width: "70%",
              transform: "rotateX(0deg) rotateY(0deg)",
              display: "block",
              transformOrigin: "center center",
              transformStyle: "preserve-3d",
            }}
          />
        </div>
        <div
          className="perspective-test-1"
          style={{
            perspective: "2000px",
            transform: "rotate(0deg)",
            position: "absolute",
            top: "8%",
            left: "52%",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={`${appBase}images/transparent.png`}
            alt="test"
            style={{
              width: "43%",
              transform: "rotateX(0deg) rotateY(0deg)",
              display: "block",
              transformOrigin: "center center",
              transformStyle: "preserve-3d",
            }}
          />
        </div>

        <img
          src={`${appBase}images/transparent.png`}
          alt="overlay"
          style={{
            width: "100%",
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            mixBlendMode: "multiply",
          }}
        />
      </div>
    </div>
  );
}
