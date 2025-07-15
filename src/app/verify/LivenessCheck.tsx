"use client";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const FACEMESH_TESSELATION = [
  [127, 34], [34, 139], [139, 127], [11, 0], [0, 37], [37, 11], [232, 231], [231, 120], [120, 232],
  [72, 37], [37, 39], [39, 72], [128, 121], [121, 47], [47, 128], [232, 121], [128, 232], [104, 69],
  [69, 67], [67, 104], [175, 171], [171, 148], [148, 175], [157, 154], [154, 155], [155, 157],
  [118, 50], [50, 101], [101, 118], [73, 39], [39, 40], [40, 73], [9, 151], [151, 108], [108, 9],
  [48, 115], [115, 131], [131, 48], [194, 204], [204, 211], [211, 194], [74, 40], [40, 185], [185, 74],
  [80, 42], [42, 183], [183, 80], [40, 92], [92, 186], [186, 40], [230, 229], [229, 118], [118, 230],
  [202, 212], [212, 214], [214, 202], [83, 18], [18, 17], [17, 83], [76, 61], [61, 146], [146, 76],
  [160, 29], [29, 30], [30, 160], [56, 157], [157, 173], [173, 56], [106, 204], [204, 194], [194, 106],
  [135, 214], [214, 192], [192, 135], [203, 165], [165, 98], [98, 203], [21, 71], [71, 68], [68, 21],
  [51, 45], [45, 4], [4, 51], [144, 24], [24, 23], [23, 144], [77, 146], [61, 77], [146, 61], [205, 50],
  [50, 187], [187, 205], [201, 200], [200, 18], [18, 201], [91, 106], [91, 182], [182, 106], [90, 91],
  [91, 181], [181, 90], [85, 84], [84, 17], [17, 85], [206, 203], [203, 36], [36, 206], [148, 171],
  [171, 140], [140, 148], [92, 40], [40, 39], [39, 92], [193, 189], [189, 244], [244, 193], [159, 158],
  [158, 28], [28, 159], [247, 246], [246, 161], [161, 247], [236, 3], [3, 196], [196, 236], [54, 68],
  [68, 104], [104, 54], [193, 168], [168, 8], [8, 193], [117, 228], [228, 31], [31, 117], [189, 193],
  [193, 55], [55, 189], [98, 97], [97, 99], [99, 98], [126, 47], [47, 100], [100, 126], [166, 79],
  [79, 218], [218, 166], [155, 154], [154, 153], [153, 155], [122, 6], [6, 168], [168, 122], [123, 147],
  [147, 187], [187, 123], [44, 1], [1, 19], [19, 44], [3, 236], [236, 51], [51, 3], [205, 187], [187, 201],
  [201, 205], [5, 195], [195, 235], [235, 5], [220, 115], [115, 218], [218, 220], [42, 80], [80, 81],
  [81, 42], [195, 5], [5, 51], [51, 195], [3, 51], [51, 48], [48, 3], [140, 171], [171, 32], [32, 140],
  [241, 238], [238, 73], [73, 241], [70, 63], [63, 53], [53, 70], [104, 68], [68, 67], [67, 104], [43, 106],
  [106, 91], [91, 43], [230, 119], [119, 120], [120, 230], [226, 35], [35, 111], [111, 226], [143, 156],
  [156, 70], [70, 143], [68, 71], [71, 139], [139, 68], [122, 168], [168, 6], [6, 122], [123, 147],
  [147, 187], [187, 123], [44, 1], [1, 19], [19, 44], [3, 236], [236, 51], [51, 3], [205, 187], [187, 201],
  [201, 205], [5, 195], [195, 235], [235, 5], [220, 115], [115, 218], [218, 220], [42, 80], [80, 81],
  [81, 42], [195, 5], [5, 51], [51, 195], [3, 51], [51, 48], [48, 3], [140, 171], [171, 32], [32, 140],
  [241, 238], [238, 73], [73, 241], [70, 63], [63, 53], [53, 70], [104, 68], [68, 67], [67, 104], [43, 106],
  [106, 91], [91, 43], [230, 119], [119, 120], [120, 230], [226, 35], [35, 111], [111, 226], [143, 156],
  [156, 70], [70, 143], [68, 71], [71, 139], [139, 68]
];

const FACEMESH_RIGHT_EYE = [
  [33, 7], [7, 163], [163, 144], [144, 145], [145, 153], [153, 154], [154, 155], [155, 133],
  [33, 246], [246, 161], [161, 160], [160, 159], [159, 158], [158, 157], [157, 173], [173, 133]
];

const FACEMESH_LEFT_EYE = [
  [362, 382], [382, 381], [381, 380], [380, 374], [374, 373], [373, 390], [390, 249],
  [362, 398], [398, 384], [384, 385], [385, 386], [386, 387], [387, 388], [388, 466], [466, 249]
];

type LivenessCheckProps = {
  onSuccess?: () => void;
  onNextStep?: () => void;
  canProceed?: boolean;
};

function dataURItoBlob(dataURI: string): Blob {
  const binary = atob(dataURI.split(",")[1]);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
}

export default function LivenessCheck({ onSuccess, onNextStep, canProceed = false }: LivenessCheckProps) {
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [start, setStart] = useState(false);
  const [question, setQuestion] = useState("Please click once for a selfie video and wait for the liveness instructions!");
  const [status, setStatus] = useState("");
  const [completed, setCompleted] = useState(false);
  const [fileArray, setFileArray] = useState<File[]>([]);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [isMobile, setIsMobile] = useState(false);
  const [wait, setWait] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Liveness check states
  const [pass1, setPass1] = useState(true);
  const [pass2, setPass2] = useState(false);
  const [pass3, setPass3] = useState(false);
  const [fileArrayTemp, setFileArrayTemp] = useState<File[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepCompleted, setStepCompleted] = useState(false);

  const videoConstraints = {
    width: { min: 480 },
    height: { min: 720 },
    aspectRatio: 1.5,
    facingMode: facingMode,
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 720);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startProcess = () => {
    setStart(true);
    setQuestion("Look straight");
    setStatus("");
    setCurrentStep(0);
    setStepCompleted(false);
  };

  const handleUserMedia = () => {
    // Webcam is ready
  };

  const handleNextStep = () => {
    if (completed && onNextStep) {
      onNextStep();
    }
  };

  function onResults(results: any) {
    const videoWidth = webcamRef.current?.video?.videoWidth || 400;
    const videoHeight = webcamRef.current?.video?.videoHeight || 300;

    if (canvasRef.current) {
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement.getContext("2d");
      if (!canvasCtx) return;

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      if (results.multiFaceLandmarks && (window as any).drawConnectors) {
        for (const landmarks of results.multiFaceLandmarks) {
          let nose_pos: any;
          let chin_pos: any;

          Object.entries(landmarks).forEach(([idx, ln]: [string, any]) => {
            // nose
            if (idx === "1") {
              nose_pos = ln;
            }
            // chin
            if (idx === "152") {
              chin_pos = ln;
            }
          });

          if (nose_pos && chin_pos) {
            let deltaX = chin_pos.x - nose_pos.x;
            let deltaY = chin_pos.y - nose_pos.y;
            const tiltAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

            (window as any).drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION, {
              color: "#ffffff25",
              lineWidth: 0.5,
            });
            (window as any).drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {
              color: "#ffffff25",
              lineWidth: 1,
            });
            (window as any).drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {
              color: "#ffffff25",
              lineWidth: 1,
            });

            if (start && !stepCompleted && !completed) {
              // Step 1: Look straight
              if (currentStep === 0 && tiltAngle >= 87 && tiltAngle <= 93) {
                setStepCompleted(true);
                setWait(true);
                setQuestion("Look straight - Capturing...");
                
                setTimeout(() => {
                  const mediaStream = webcamRef.current?.getScreenshot();
                  if (mediaStream) {
                    const blob = dataURItoBlob(mediaStream);
                    let currentTimestamp = Date.now();
                    const file = new File([blob], currentTimestamp.toString(), {
                      type: blob.type,
                      lastModified: new Date().getTime(),
                    });
                    setFileArrayTemp(prev => [...prev, file]);
                    setFileArray(prev => [...prev, file]);
                    setCurrentStep(1);
                    setStepCompleted(false);
                    setWait(false);
                    setQuestion("Turn Left");
                  }
                }, 1000);
              }
              // Step 2: Turn Left
              else if (currentStep === 1 && tiltAngle >= 100 && tiltAngle <= 115) {
                setStepCompleted(true);
                setWait(true);
                setQuestion("Turn Left - Capturing...");
                
                setTimeout(() => {
                  const mediaStream = webcamRef.current?.getScreenshot();
                  if (mediaStream) {
                    const blob = dataURItoBlob(mediaStream);
                    let currentTimestamp = Date.now();
                    const file = new File([blob], currentTimestamp.toString(), {
                      type: blob.type,
                      lastModified: new Date().getTime(),
                    });
                    setFileArrayTemp(prev => [...prev, file]);
                    setFileArray(prev => [...prev, file]);
                    setCurrentStep(2);
                    setStepCompleted(false);
                    setWait(false);
                    setQuestion("Turn Right");
                  }
                }, 1000);
              }
              // Step 3: Turn Right
              else if (currentStep === 2 && tiltAngle >= 65 && tiltAngle <= 80) {
                setStepCompleted(true);
                setWait(true);
                setQuestion("Turn Right - Capturing...");
                
                setTimeout(() => {
                  const mediaStream = webcamRef.current?.getScreenshot();
                  if (mediaStream) {
                    const blob = dataURItoBlob(mediaStream);
                    let currentTimestamp = Date.now();
                    const file = new File([blob], currentTimestamp.toString(), {
                      type: blob.type,
                      lastModified: new Date().getTime(),
                    });
                    setFileArrayTemp(prev => [...prev, file]);
                    setFileArray(prev => [...prev, file]);
                    setCompleted(true);
                    setWait(false);
                    setShowSuccess(true);
                    setQuestion("Liveness check completed successfully!");
                  }
                }, 1000);
              }
            }
          }
        }
      }
      canvasCtx.restore();
    }
  }

  useEffect(() => {
    if (start && webcamRef.current && canvasRef.current && !completed) {
      const loadFaceMeshScript = () => {
        return new Promise<void>((resolve, reject) => {
          if ((window as any).FaceMesh) {
            resolve();
            return;
          }
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js";
          script.async = true;
          script.onload = () => resolve();
          script.onerror = reject;
          document.body.appendChild(script);
        });
      };

      const loadDrawingUtilsScript = () => {
        return new Promise<void>((resolve, reject) => {
          if ((window as any).drawConnectors) {
            resolve();
            return;
          }
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js";
          script.async = true;
          script.onload = () => resolve();
          script.onerror = reject;
          document.body.appendChild(script);
        });
      };

      Promise.all([loadFaceMeshScript(), loadDrawingUtilsScript()]).then(() => {
        const faceMesh = new (window as any).FaceMesh({
          locateFile: (file: string) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
          },
        });

        faceMesh.setOptions({
          maxNumFaces: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        faceMesh.onResults(onResults);

        const sendToMediaPipe = async () => {
          if (webcamRef.current?.video && !completed) {
            await faceMesh.send({ image: webcamRef.current.video });
            requestAnimationFrame(sendToMediaPipe);
          }
        };

        sendToMediaPipe();
      });
    }
  }, [facingMode, start, currentStep, stepCompleted, completed]);

  useEffect(() => {
    if (completed) {
      setQuestion("Please wait while we process...");
      // Here you would typically send the fileArray to your backend
      // For now, we'll just call onSuccess
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 2000);
    }
  }, [completed, onSuccess]);

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <h2 className="text-xl font-bold mb-4">Liveness Check</h2>
        
        {/* Success Animation */}
        <div className="relative w-[400px] h-[300px] bg-green-50 rounded-lg border-2 border-green-200 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-green-700 mb-2">Liveness Check Passed!</h3>
            <p className="text-sm text-gray-600 mb-4">All verification steps completed successfully</p>
            
            <button
              onClick={handleNextStep}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Continue to Next Step
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="text-xl font-bold mb-4">Liveness Check</h2>
      
      <div className="relative w-[400px] h-[300px]">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={400}
          height={300}
          mirrored={facingMode === "user"}
          onUserMedia={handleUserMedia}
          videoConstraints={videoConstraints}
          forceScreenshotSourceSize
          style={{ 
            opacity: start ? "0" : "1",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px"
          }}
        />
        <canvas
          ref={canvasRef}
          className="output_canvas_liveness"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 5,
            width: "100%",
            height: "100%",
            transform: "scaleX(-1)",
            pointerEvents: "none",
            borderRadius: "8px"
          }}
        />
      </div>

      <div className="mt-4 text-center">
        {!completed ? (
          <>
            <p className="text-lg font-medium text-gray-700 mb-2">{question}</p>
            {wait && (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            )}
            <p className="text-sm text-gray-500 mt-2">
              Step {currentStep + 1} of 3
            </p>
          </>
        ) : (
          <p className="text-lg font-bold text-green-600">Liveness check passed!</p>
        )}
        {status && <p className="text-blue-500 mt-2">{status}</p>}
      </div>

      <div className="mt-4 flex gap-4">
        {!start ? (
          <button
            onClick={startProcess}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Liveness Check
          </button>
        ) : !completed ? (
          <button
            onClick={() => setFacingMode(facingMode === "user" ? "environment" : "user")}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Switch Camera
          </button>
        ) : null}
      </div>
    </div>
  );
} 