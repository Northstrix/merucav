"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GradientConfig } from "./types";
import { CustomSlider } from "../ui/custom-slider";
import { Label } from "../ui/label";
import { useTranslation } from "@/hooks/use-translation";
import CustomCheckbox from "@/components/CustomCheckbox";
import useIsRTL from "@/hooks/use-is-rtl";
import { ColorPicker } from "../color-picker";
import { hsvaToHex, hexToHsva } from "@uiw/color-convert";
import { FloatingLabelInput } from "../ui/floating-label-input";
import { Button } from "../ui/button";
import ChronicleButton from "../ui/RefinedChronicleButton";

interface GradientPropertiesEditorProps {
  config: GradientConfig;
  setConfig: (config: GradientConfig) => void;
}

export function GradientPropertiesEditor({
  config,
  setConfig,
}: GradientPropertiesEditorProps) {
  const { t } = useTranslation();
  const isRTL = useIsRTL();

  const updateShaderConfig = (
    shaderName: keyof GradientConfig["shaders"],
    key: string,
    value: any
  ) => {
    const newConfig = { ...config };
    const shaderConf = newConfig.shaders[shaderName] as any;

    const keys = key.split(".");
    let current = shaderConf;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    newConfig.shaders[shaderName] = shaderConf;
    setConfig(newConfig);
  };

  const {
    flow,
    tranquiluxe,
    kaleidoscope,
    fate,
    structuredNoise,
    balatro,
    electricPulse,
    laserBlast,
    novatrix,
    voronoi,
    discGlare,
    hydrogen,
    pulse,
    melt,
    truchet,
    neonPolygon,
    exposedFilm,
    psychedelicGlass,
    solarWhirls,
    chargedCells,
    refractedWave,
    swirl,
    spiral,
    neuralNoise,
    interstellar,
    corrodedSpiral,
    spiralTunnel,
    fractalVortex,
    infiniteCorridor,
    spaceFlower,
    electricSpiral,
    twistedKaleidoscope,
    trickyShapes,
    gridAttractor,
    tunnelCylinders,
    psychedelicFlowerTunnel,
    celestialJourney,
    discoHive,
    discoHexnel,
    kaleidoscopeWheels,
    discoFever,
    cosmicCity,
    quantumShapes,
    glassOrigin,
    mandalaDice,
    chromaticUniverse,
    cubicSpin,
    membranes,
    quantumCore,
    neonKaleidoscope,
    sparkTunnel,
    whirlpool,
    containerFlow,
    mandelbrot,
    neuralGlass,
    blobbyWorld,
    spaceThreads 
  } = config.shaders;

  const renderShaderControls = (
    shaderName: keyof GradientConfig["shaders"],
    shaderConfig: any,
    children: React.ReactNode
  ) => (
    <AccordionItem value={shaderName} className="border-b-0">
      <AccordionTrigger>{t(shaderName)}</AccordionTrigger>
      <AccordionContent className="space-y-4 pt-4">
        <div
          style={{
            width: "100%",
            display: "flex",
            direction: isRTL ? "rtl" : "ltr",
          }}
        >
          <CustomCheckbox
            id={`${shaderName}-enable`}
            direction={isRTL ? "rtl" : "ltr"}
            checked={shaderConfig.enabled}
            onChange={(checked) =>
              updateShaderConfig(shaderName, "enabled", !!checked)
            }
            label={t("enable")}
          />
        </div>
        {shaderConfig.enabled && (
          <>
            <ControlSlider
              label={t("opacity")}
              value={shaderConfig.opacity}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig(shaderName, "opacity", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id={`${shaderName}-opacity`}
              value={shaderConfig.opacity}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig(shaderName, "opacity", v)
              }
              isRTL={isRTL}
            />

            <h3
              className="text-sm font-medium pt-2"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("transform")}
            </h3>
            <ControlSlider
              label={t("translateX")}
              value={shaderConfig.transform.translateX}
              min={-200}
              max={200}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig(shaderName, "transform.translateX", v)
              }
              isRTL={isRTL}
              unit="%"
            />
            <CustomSlider
              id={`${shaderName}-translate-x`}
              value={shaderConfig.transform.translateX}
              min={-200}
              max={200}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig(shaderName, "transform.translateX", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("translateY")}
              value={shaderConfig.transform.translateY}
              min={-200}
              max={200}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig(shaderName, "transform.translateY", v)
              }
              isRTL={isRTL}
              unit="%"
            />
            <CustomSlider
              id={`${shaderName}-translate-y`}
              value={shaderConfig.transform.translateY}
              min={-200}
              max={200}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig(shaderName, "transform.translateY", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rotation")}
              value={shaderConfig.transform.rotation}
              min={-360}
              max={360}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig(shaderName, "transform.rotation", v)
              }
              isRTL={isRTL}
              unit="°"
            />
            <CustomSlider
              id={`${shaderName}-rotation`}
              value={shaderConfig.transform.rotation}
              min={-360}
              max={360}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig(shaderName, "transform.rotation", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("scale")}
              value={shaderConfig.transform.scale}
              min={0.1}
              max={10}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig(shaderName, "transform.scale", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id={`${shaderName}-scale`}
              value={shaderConfig.transform.scale}
              min={0.1}
              max={10}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig(shaderName, "transform.scale", v)
              }
              isRTL={isRTL}
            />

            <h3
              className="text-sm font-medium pt-2"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("parameters")}
            </h3>
            {children}
          </>
        )}
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <div style={{ textAlign: isRTL ? "right" : "left" }} className="space-y-4 m-6">
      <Accordion
        type="multiple"
        defaultValue={["flow"]}
        className="w-full space-y-4"
      >
        {renderShaderControls(
          "flow",
          flow,
          <>
            <ControlSlider
              label={t("velocity")}
              value={flow.velocity}
              min={0}
              max={5}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("flow", "velocity", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="flow-velocity"
              value={flow.velocity}
              min={0}
              max={5}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("flow", "velocity", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("detail")}
              value={flow.detail}
              min={10}
              max={1000}
              step={5}
              onValueChange={(v) => updateShaderConfig("flow", "detail", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="flow-detail"
              value={flow.detail}
              min={10}
              max={1000}
              step={5}
              onValueChange={(v) => updateShaderConfig("flow", "detail", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("twist")}
              value={flow.twist}
              min={0}
              max={100}
              step={1}
              onValueChange={(v) => updateShaderConfig("flow", "twist", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="flow-twist"
              value={flow.twist}
              min={0}
              max={100}
              step={1}
              onValueChange={(v) => updateShaderConfig("flow", "twist", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("speed")}
              value={flow.speed}
              min={0}
              max={10}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("flow", "speed", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="flow-speed"
              value={flow.speed}
              min={0}
              max={10}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("flow", "speed", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("contrast")}
              value={flow.contrast}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("flow", "contrast", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="flow-contrast"
              value={flow.contrast}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("flow", "contrast", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbR")}
              value={flow.rgbR}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("flow", "rgbR", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="flow-rgbR"
              value={flow.rgbR}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("flow", "rgbR", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbG")}
              value={flow.rgbG}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("flow", "rgbG", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="flow-rgbG"
              value={flow.rgbG}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("flow", "rgbG", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbB")}
              value={flow.rgbB}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("flow", "rgbB", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="flow-rgbB"
              value={flow.rgbB}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("flow", "rgbB", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("colorOffset")}
              value={flow.colorOffset}
              min={-1}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("flow", "colorOffset", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="flow-colorOffset"
              value={flow.colorOffset}
              min={-1}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("flow", "colorOffset", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("hue")}
              value={flow.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("flow", "hue", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="flow-hue"
              value={flow.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("flow", "hue", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("saturation")}
              value={flow.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("flow", "saturation", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="flow-saturation"
              value={flow.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("flow", "saturation", v)}
              isRTL={isRTL}
            />
          </>
        )}
        {renderShaderControls(
          "tranquiluxe",
          tranquiluxe,
          <>
            <ControlSlider
              label={t("speed")}
              value={tranquiluxe.speed}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("tranquiluxe", "speed", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="tranquiluxe-speed"
              value={tranquiluxe.speed}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("tranquiluxe", "speed", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("hue")}
              value={tranquiluxe.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("tranquiluxe", "hue", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="tranquiluxe-hue"
              value={tranquiluxe.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("tranquiluxe", "hue", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("saturation")}
              value={tranquiluxe.saturation}
              min={0}
              max={100}
              step={1}
              onValueChange={(v) =>
                updateShaderConfig("tranquiluxe", "saturation", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="tranquiluxe-saturation"
              value={tranquiluxe.saturation}
              min={0}
              max={100}
              step={1}
              onValueChange={(v) =>
                updateShaderConfig("tranquiluxe", "saturation", v)
              }
              isRTL={isRTL}
            />
          </>
        )}
        {renderShaderControls(
          "kaleidoscope",
          kaleidoscope,
          <>
            <ControlSlider
              label={t("speed")}
              value={kaleidoscope.speed}
              min={0}
              max={5}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("kaleidoscope", "speed", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="kaleidoscope-speed"
              value={kaleidoscope.speed}
              min={0}
              max={5}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("kaleidoscope", "speed", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("hue")}
              value={kaleidoscope.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) =>
                updateShaderConfig("kaleidoscope", "hue", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="kaleidoscope-hue"
              value={kaleidoscope.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) =>
                updateShaderConfig("kaleidoscope", "hue", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("saturation")}
              value={kaleidoscope.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("kaleidoscope", "saturation", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="kaleidoscope-saturation"
              value={kaleidoscope.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("kaleidoscope", "saturation", v)
              }
              isRTL={isRTL}
            />
          </>
        )}
        {renderShaderControls(
          "fate",
          fate,
          <>
            <ControlSlider
              label={t("speed")}
              value={fate.speed}
              min={0}
              max={5}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("fate", "speed", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="fate-speed"
              value={fate.speed}
              min={0}
              max={5}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("fate", "speed", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("hue")}
              value={fate.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("fate", "hue", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="fate-hue"
              value={fate.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("fate", "hue", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("saturation")}
              value={fate.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fate", "saturation", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="fate-saturation"
              value={fate.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fate", "saturation", v)}
              isRTL={isRTL}
            />
          </>
        )}
        {renderShaderControls(
          "structuredNoise",
          structuredNoise,
          <>
            <ControlSlider
              label={t("speed")}
              value={structuredNoise.speed}
              min={0}
              max={5}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("structuredNoise", "speed", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="structuredNoise-speed"
              value={structuredNoise.speed}
              min={0}
              max={5}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("structuredNoise", "speed", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("mirrors")}
              value={structuredNoise.mirrors}
              min={1}
              max={10}
              step={1}
              onValueChange={(v) =>
                updateShaderConfig("structuredNoise", "mirrors", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="structuredNoise-mirrors"
              value={structuredNoise.mirrors}
              min={1}
              max={10}
              step={1}
              onValueChange={(v) =>
                updateShaderConfig("structuredNoise", "mirrors", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("noiseStrength")}
              value={structuredNoise.noiseStrength}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("structuredNoise", "noiseStrength", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="structuredNoise-noiseStrength"
              value={structuredNoise.noiseStrength}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("structuredNoise", "noiseStrength", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("distortionStrength")}
              value={structuredNoise.distortionStrength}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("structuredNoise", "distortionStrength", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="structuredNoise-distortionStrength"
              value={structuredNoise.distortionStrength}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("structuredNoise", "distortionStrength", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("hue")}
              value={structuredNoise.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) =>
                updateShaderConfig("structuredNoise", "hue", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="structuredNoise-hue"
              value={structuredNoise.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) =>
                updateShaderConfig("structuredNoise", "hue", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("saturation")}
              value={structuredNoise.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("structuredNoise", "saturation", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="structuredNoise-saturation"
              value={structuredNoise.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("structuredNoise", "saturation", v)
              }
              isRTL={isRTL}
            />
            <CustomCheckbox
              id="structuredNoise-useFilter"
              direction={isRTL ? "rtl" : "ltr"}
              checked={structuredNoise.useFilter}
              onChange={(checked) =>
                updateShaderConfig("structuredNoise", "useFilter", !!checked)
              }
              label={t("useFilter")}
            />
            {structuredNoise.useFilter && (
              <ColorPicker
                value={structuredNoise.filterColor}
                onValueChange={(c) =>
                  updateShaderConfig(
                    "structuredNoise",
                    "filterColor",
                    hsvaToHex(c)
                  )
                }
                hideAlpha
                hideContrastRatio
              />
            )}
          </>
        )}
        {renderShaderControls(
          "balatro",
          balatro,
          <>
            <ControlSlider
              label={t("speed")}
              value={balatro.speed}
              min={0}
              max={10}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("balatro", "speed", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="balatro-speed"
              value={balatro.speed}
              min={0}
              max={10}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("balatro", "speed", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("spinRotation")}
              value={balatro.spinRotation}
              min={-10}
              max={10}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "spinRotation", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="balatro-spinRotation"
              value={balatro.spinRotation}
              min={-10}
              max={10}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "spinRotation", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("spinSpeed")}
              value={balatro.spinSpeed}
              min={0}
              max={20}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "spinSpeed", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="balatro-spinSpeed"
              value={balatro.spinSpeed}
              min={0}
              max={20}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "spinSpeed", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("contrast")}
              value={balatro.contrast}
              min={0}
              max={10}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "contrast", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="balatro-contrast"
              value={balatro.contrast}
              min={0}
              max={10}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "contrast", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("lighting")}
              value={balatro.lighting}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "lighting", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="balatro-lighting"
              value={balatro.lighting}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "lighting", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("spinAmount")}
              value={balatro.spinAmount}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "spinAmount", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="balatro-spinAmount"
              value={balatro.spinAmount}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "spinAmount", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("pixelFilter")}
              value={balatro.pixelFilter}
              min={100}
              max={2000}
              step={1}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "pixelFilter", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="balatro-pixelFilter"
              value={balatro.pixelFilter}
              min={100}
              max={2000}
              step={1}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "pixelFilter", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("spinEase")}
              value={balatro.spinEase}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "spinEase", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="balatro-spinEase"
              value={balatro.spinEase}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "spinEase", v)
              }
              isRTL={isRTL}
            />
            <CustomCheckbox
              id="balatro-is-rotate"
              direction={isRTL ? "rtl" : "ltr"}
              checked={balatro.isRotate}
              onChange={(checked) =>
                updateShaderConfig("balatro", "isRotate", !!checked)
              }
              label={t("isRotate")}
            />
            <h4
              className="text-xs font-medium pt-2"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("color")} 1
            </h4>
            <ControlSlider
              label={t("rgbR")}
              value={balatro.color1_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "color1_r", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="balatro-color1_r"
              value={balatro.color1_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "color1_r", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbG")}
              value={balatro.color1_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "color1_g", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="balatro-color1_g"
              value={balatro.color1_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "color1_g", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbB")}
              value={balatro.color1_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "color1_b", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="balatro-color1_b"
              value={balatro.color1_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "color1_b", v)
              }
              isRTL={isRTL}
            />
            <h4
              className="text-xs font-medium pt-2"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("color")} 2
            </h4>
            <ControlSlider
              label={t("rgbR")}
              value={balatro.color2_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "color2_r", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="balatro-color2_r"
              value={balatro.color2_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "color2_r", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbG")}
              value={balatro.color2_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "color2_g", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="balatro-color2_g"
              value={balatro.color2_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "color2_g", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbB")}
              value={balatro.color2_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "color2_b", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="balatro-color2_b"
              value={balatro.color2_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "color2_b", v)
              }
              isRTL={isRTL}
            />
            <h4
              className="text-xs font-medium pt-2"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("color")} 3
            </h4>
            <ControlSlider
              label={t("rgbR")}
              value={balatro.color3_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "color3_r", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="balatro-color3_r"
              value={balatro.color3_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "color3_r", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbG")}
              value={balatro.color3_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "color3_g", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="balatro-color3_g"
              value={balatro.color3_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "color3_g", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbB")}
              value={balatro.color3_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "color3_b", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="balatro-color3_b"
              value={balatro.color3_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("balatro", "color3_b", v)
              }
              isRTL={isRTL}
            />
          </>
        )}
        {renderShaderControls(
          "electricPulse",
          electricPulse,
          <>
            <ControlSlider
              label={t("speed")}
              value={electricPulse.speed}
              min={0}
              max={40}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("electricPulse", "speed", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="electricPulse-speed"
              value={electricPulse.speed}
              min={0}
              max={40}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("electricPulse", "speed", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("hue")}
              value={electricPulse.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) =>
                updateShaderConfig("electricPulse", "hue", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="electricPulse-hue"
              value={electricPulse.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) =>
                updateShaderConfig("electricPulse", "hue", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("saturation")}
              value={electricPulse.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("electricPulse", "saturation", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="electricPulse-saturation"
              value={electricPulse.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("electricPulse", "saturation", v)
              }
              isRTL={isRTL}
            />
            <h4
              className="text-xs font-medium pt-2"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("color")}
            </h4>
            <ControlSlider
              label={t("rgbR")}
              value={electricPulse.color1_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("electricPulse", "color1_r", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="electricPulse-color1_r"
              value={electricPulse.color1_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("electricPulse", "color1_r", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbG")}
              value={electricPulse.color1_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("electricPulse", "color1_g", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="electricPulse-color1_g"
              value={electricPulse.color1_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("electricPulse", "color1_g", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbB")}
              value={electricPulse.color1_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("electricPulse", "color1_b", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="electricPulse-color1_b"
              value={electricPulse.color1_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("electricPulse", "color1_b", v)
              }
              isRTL={isRTL}
            />
          </>
        )}
        {renderShaderControls(
          "laserBlast",
          laserBlast,
          <>
            <ControlSlider
              label={t("speed")}
              value={laserBlast.speed}
              min={0}
              max={5}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "speed", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="laserBlast-speed"
              value={laserBlast.speed}
              min={0}
              max={5}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "speed", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("power")}
              value={laserBlast.power}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "power", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="laserBlast-power"
              value={laserBlast.power}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "power", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("duration")}
              value={laserBlast.duration}
              min={0}
              max={10}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "duration", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="laserBlast-duration"
              value={laserBlast.duration}
              min={0}
              max={10}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "duration", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("startRadius")}
              value={laserBlast.startRadius}
              min={0}
              max={5}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "startRadius", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="laserBlast-startRadius"
              value={laserBlast.startRadius}
              min={0}
              max={5}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "startRadius", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("endRadius")}
              value={laserBlast.endRadius}
              min={0}
              max={5}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "endRadius", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="laserBlast-endRadius"
              value={laserBlast.endRadius}
              min={0}
              max={5}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "endRadius", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("hue")}
              value={laserBlast.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("laserBlast", "hue", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="laserBlast-hue"
              value={laserBlast.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("laserBlast", "hue", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("saturation")}
              value={laserBlast.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "saturation", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="laserBlast-saturation"
              value={laserBlast.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "saturation", v)
              }
              isRTL={isRTL}
            />
            <h4
              className="text-xs font-medium pt-2"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("startColor")}
            </h4>
            <ControlSlider
              label={t("rgbR")}
              value={laserBlast.color1_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "color1_r", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="laserBlast-color1_r"
              value={laserBlast.color1_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "color1_r", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbG")}
              value={laserBlast.color1_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "color1_g", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="laserBlast-color1_g"
              value={laserBlast.color1_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "color1_g", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbB")}
              value={laserBlast.color1_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "color1_b", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="laserBlast-color1_b"
              value={laserBlast.color1_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "color1_b", v)
              }
              isRTL={isRTL}
            />
            <h4
              className="text-xs font-medium pt-2"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("endColor")}
            </h4>
            <ControlSlider
              label={t("rgbR")}
              value={laserBlast.color2_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "color2_r", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="laserBlast-color2_r"
              value={laserBlast.color2_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "color2_r", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbG")}
              value={laserBlast.color2_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "color2_g", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="laserBlast-color2_g"
              value={laserBlast.color2_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "color2_g", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbB")}
              value={laserBlast.color2_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "color2_b", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="laserBlast-color2_b"
              value={laserBlast.color2_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("laserBlast", "color2_b", v)
              }
              isRTL={isRTL}
            />
          </>
        )}
        {renderShaderControls(
          "novatrix",
          novatrix,
          <>
            <ControlSlider
              label={t("speed")}
              value={novatrix.speed}
              min={0}
              max={5}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("novatrix", "speed", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="novatrix-speed"
              value={novatrix.speed}
              min={0}
              max={5}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("novatrix", "speed", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("hue")}
              value={novatrix.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("novatrix", "hue", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="novatrix-hue"
              value={novatrix.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("novatrix", "hue", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("saturation")}
              value={novatrix.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("novatrix", "saturation", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="novatrix-saturation"
              value={novatrix.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("novatrix", "saturation", v)
              }
              isRTL={isRTL}
            />
            <h4
              className="text-xs font-medium pt-2"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("color")}
            </h4>
            <ControlSlider
              label={t("rgbR")}
              value={novatrix.color_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("novatrix", "color_r", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="novatrix-color_r"
              value={novatrix.color_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("novatrix", "color_r", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbG")}
              value={novatrix.color_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("novatrix", "color_g", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="novatrix-color_g"
              value={novatrix.color_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("novatrix", "color_g", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbB")}
              value={novatrix.color_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("novatrix", "color_b", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="novatrix-color_b"
              value={novatrix.color_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("novatrix", "color_b", v)
              }
              isRTL={isRTL}
            />
          </>
        )}
        {renderShaderControls(
          "voronoi",
          voronoi,
          <>
            <ControlSlider
              label={t("speed")}
              value={voronoi.speed}
              min={0}
              max={5}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("voronoi", "speed", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="voronoi-speed"
              value={voronoi.speed}
              min={0}
              max={5}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("voronoi", "speed", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("scale")}
              value={voronoi.scale}
              min={1}
              max={50}
              step={0.5}
              onValueChange={(v) => updateShaderConfig("voronoi", "scale", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="voronoi-scale"
              value={voronoi.scale}
              min={1}
              max={50}
              step={0.5}
              onValueChange={(v) => updateShaderConfig("voronoi", "scale", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("hue")}
              value={voronoi.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("voronoi", "hue", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="voronoi-hue"
              value={voronoi.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("voronoi", "hue", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("saturation")}
              value={voronoi.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("voronoi", "saturation", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="voronoi-saturation"
              value={voronoi.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("voronoi", "saturation", v)
              }
              isRTL={isRTL}
            />
          </>
        )}
        {renderShaderControls(
          "discGlare",
          discGlare,
          <>
            <ControlSlider
              label={t("phase")}
              value={discGlare.phase}
              min={0}
              max={10}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("discGlare", "phase", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="discGlare-phase"
              value={discGlare.phase}
              min={0}
              max={10}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("discGlare", "phase", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("distortion")}
              value={discGlare.distortion}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("discGlare", "distortion", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="discGlare-distortion"
              value={discGlare.distortion}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("discGlare", "distortion", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("zoom")}
              value={discGlare.zoom}
              min={0.1}
              max={5}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("discGlare", "zoom", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="discGlare-zoom"
              value={discGlare.zoom}
              min={0.1}
              max={5}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("discGlare", "zoom", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("contrast")}
              value={discGlare.contrast}
              min={0.1}
              max={50}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("discGlare", "contrast", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="discGlare-contrast"
              value={discGlare.contrast}
              min={0.1}
              max={50}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("discGlare", "contrast", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("gamma")}
              value={discGlare.gamma}
              min={0.1}
              max={5}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("discGlare", "gamma", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="discGlare-gamma"
              value={discGlare.gamma}
              min={0.1}
              max={5}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("discGlare", "gamma", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("hue")}
              value={discGlare.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("discGlare", "hue", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="discGlare-hue"
              value={discGlare.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("discGlare", "hue", v)}
              isRTL={isRTL}
            />
          </>
        )}
        {renderShaderControls(
          "hydrogen",
          hydrogen,
          <div className="space-y-4">
            <ControlSlider
              label={t("principalN")}
              value={hydrogen.n}
              min={0}
              max={12}
              step={1}
              onValueChange={(v) => updateShaderConfig("hydrogen", "n", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="hydrogen-n"
              value={hydrogen.n}
              min={0}
              max={12}
              step={1}
              onValueChange={(v) => updateShaderConfig("hydrogen", "n", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("azimuthalL")}
              value={hydrogen.l}
              min={0}
              max={40}
              step={1}
              onValueChange={(v) => updateShaderConfig("hydrogen", "l", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="hydrogen-l"
              value={hydrogen.l}
              min={0}
              max={40}
              step={1}
              onValueChange={(v) => updateShaderConfig("hydrogen", "l", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("magneticM")}
              value={hydrogen.m}
              min={0}
              max={10}
              step={1}
              onValueChange={(v) => updateShaderConfig("hydrogen", "m", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="hydrogen-m"
              value={hydrogen.m}
              min={0}
              max={10}
              step={1}
              onValueChange={(v) => updateShaderConfig("hydrogen", "m", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("zoom")}
              value={hydrogen.zoom}
              min={0.1}
              max={50}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("hydrogen", "zoom", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="hydrogen-zoom"
              value={hydrogen.zoom}
              min={0.1}
              max={50}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("hydrogen", "zoom", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("contrast")}
              value={hydrogen.contrast}
              min={0.1}
              max={50}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("hydrogen", "contrast", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="hydrogen-contrast"
              value={hydrogen.contrast}
              min={0.1}
              max={50}
              step={0.1}
              onValueChange={(v) =>
                updateShaderConfig("hydrogen", "contrast", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("gamma")}
              value={hydrogen.gamma}
              min={0.001}
              max={5}
              step={0.001}
              onValueChange={(v) => updateShaderConfig("hydrogen", "gamma", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="hydrogen-gamma"
              value={hydrogen.gamma}
              min={0.001}
              max={5}
              step={0.001}
              onValueChange={(v) => updateShaderConfig("hydrogen", "gamma", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("hue")}
              value={hydrogen.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("hydrogen", "hue", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="hydrogen-hue"
              value={hydrogen.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("hydrogen", "hue", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("saturation")}
              value={hydrogen.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("hydrogen", "saturation", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="hydrogen-saturation"
              value={hydrogen.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("hydrogen", "saturation", v)
              }
              isRTL={isRTL}
            />

            <h4
              className="text-xs font-medium pt-2"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("color1")}
            </h4>
            <ControlSlider
              label={t("rgbR")}
              value={hydrogen.color1_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("hydrogen", "color1_r", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="hydrogen-color1_r"
              value={hydrogen.color1_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("hydrogen", "color1_r", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbG")}
              value={hydrogen.color1_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("hydrogen", "color1_g", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="hydrogen-color1_g"
              value={hydrogen.color1_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("hydrogen", "color1_g", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbB")}
              value={hydrogen.color1_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("hydrogen", "color1_b", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="hydrogen-color1_b"
              value={hydrogen.color1_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("hydrogen", "color1_b", v)
              }
              isRTL={isRTL}
            />

            <h4
              className="text-xs font-medium pt-2"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("color2")}
            </h4>
            <ControlSlider
              label={t("rgbR")}
              value={hydrogen.color2_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("hydrogen", "color2_r", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="hydrogen-color2_r"
              value={hydrogen.color2_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("hydrogen", "color2_r", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbG")}
              value={hydrogen.color2_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("hydrogen", "color2_g", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="hydrogen-color2_g"
              value={hydrogen.color2_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("hydrogen", "color2_g", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbB")}
              value={hydrogen.color2_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("hydrogen", "color2_b", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="hydrogen-color2_b"
              value={hydrogen.color2_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("hydrogen", "color2_b", v)
              }
              isRTL={isRTL}
            />
          </div>
        )}
        {renderShaderControls(
          "pulse",
          pulse,
          <>
            <ControlSlider
              label={t("speed")}
              value={pulse.speed}
              min={0}
              max={100}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("pulse", "speed", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="pulse-speed"
              value={pulse.speed}
              min={0}
              max={100}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("pulse", "speed", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("factor")}
              value={pulse.factor}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("pulse", "factor", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="pulse-factor"
              value={pulse.factor}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("pulse", "factor", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("hue")}
              value={pulse.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("pulse", "hue", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="pulse-hue"
              value={pulse.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("pulse", "hue", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("saturation")}
              value={pulse.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("pulse", "saturation", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="pulse-saturation"
              value={pulse.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("pulse", "saturation", v)
              }
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("contrast")}
              value={pulse.contrast}
              min={0}
              max={5}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("pulse", "contrast", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="pulse-contrast"
              value={pulse.contrast}
              min={0}
              max={5}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("pulse", "contrast", v)}
              isRTL={isRTL}
            />
          </>
        )}
        {/* MELT */}
        {renderShaderControls(
          "melt",
          melt,
          <>
            <ControlSlider
              label={t("speed")}
              value={melt.speed}
              min={0}
              max={10}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("melt", "speed", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="melt-speed"
              value={melt.speed}
              min={0}
              max={40}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("melt", "speed", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("zoom")}
              value={melt.zoom}
              min={0.1}
              max={20}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("melt", "zoom", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="melt-zoom"
              value={melt.zoom}
              min={0.1}
              max={20}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("melt", "zoom", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("detail")}
              value={melt.detail}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("melt", "detail", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="melt-detail"
              value={melt.detail}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("melt", "detail", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("hue")}
              value={melt.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("melt", "hue", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="melt-hue"
              value={melt.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("melt", "hue", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("saturation")}
              value={melt.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("melt", "saturation", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="melt-saturation"
              value={melt.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("melt", "saturation", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("contrast")}
              value={melt.contrast}
              min={0}
              max={5}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("melt", "contrast", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="melt-contrast"
              value={melt.contrast}
              min={0}
              max={5}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("melt", "contrast", v)}
              isRTL={isRTL}
            />
          </>
        )}

        {/* TRUCHET */}
        {renderShaderControls(
          "truchet",
          truchet,
          <>
            <ControlSlider
              label={t("speed")}
              value={truchet.speed}
              min={0}
              max={25}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("truchet", "speed", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="truchet-speed"
              value={truchet.speed}
              min={0}
              max={25}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("truchet", "speed", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("zoom")}
              value={truchet.zoom}
              min={1}
              max={100}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("truchet", "zoom", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="truchet-zoom"
              value={truchet.zoom}
              min={1}
              max={100}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("truchet", "zoom", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("sectors")}
              value={truchet.sectors}
              min={3}
              max={32}
              step={1}
              onValueChange={(v) => updateShaderConfig("truchet", "sectors", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="truchet-sectors"
              value={truchet.sectors}
              min={3}
              max={32}
              step={1}
              onValueChange={(v) => updateShaderConfig("truchet", "sectors", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("hue")}
              value={truchet.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("truchet", "hue", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="truchet-hue"
              value={truchet.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("truchet", "hue", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("saturation")}
              value={truchet.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("truchet", "saturation", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="truchet-saturation"
              value={truchet.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("truchet", "saturation", v)
              }
              isRTL={isRTL}
            />
          </>
        )}
        {renderShaderControls("neonPolygon", neonPolygon, <>
          {/* SPEED */}
          <ControlSlider
            label={t("speed")}
            value={neonPolygon.speed}
            min={0}
            max={5}
            step={0.1}
            onValueChange={(v) => updateShaderConfig("neonPolygon", "speed", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="neonPolygon-speed"
            value={neonPolygon.speed}
            min={0}
            max={5}
            step={0.1}
            onValueChange={(v) => updateShaderConfig("neonPolygon", "speed", v)}
            isRTL={isRTL}
          />

          {/* SIDES */}
          <ControlSlider
            label={t("sides")}
            value={neonPolygon.sides}
            min={3}
            max={20}
            step={1}
            onValueChange={(v) => updateShaderConfig("neonPolygon", "sides", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="neonPolygon-sides"
            value={neonPolygon.sides}
            min={3}
            max={20}
            step={1}
            onValueChange={(v) => updateShaderConfig("neonPolygon", "sides", v)}
            isRTL={isRTL}
          />

          {/* GLOW */}
          <ControlSlider
            label={t("glow")}
            value={neonPolygon.glow}
            min={0}
            max={2}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("neonPolygon", "glow", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="neonPolygon-glow"
            value={neonPolygon.glow}
            min={0}
            max={2}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("neonPolygon", "glow", v)}
            isRTL={isRTL}
          />

          {/* HUE */}
          <ControlSlider
            label={t("hue")}
            value={neonPolygon.hue}
            min={0}
            max={360}
            step={1}
            onValueChange={(v) => updateShaderConfig("neonPolygon", "hue", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="neonPolygon-hue"
            value={neonPolygon.hue}
            min={0}
            max={360}
            step={1}
            onValueChange={(v) => updateShaderConfig("neonPolygon", "hue", v)}
            isRTL={isRTL}
          />

          {/* SATURATION */}
          <ControlSlider
            label={t("saturation")}
            value={neonPolygon.saturation}
            min={0}
            max={2}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("neonPolygon", "saturation", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="neonPolygon-saturation"
            value={neonPolygon.saturation}
            min={0}
            max={2}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("neonPolygon", "saturation", v)}
            isRTL={isRTL}
          />
        </>)}

        {renderShaderControls(
          "exposedFilm",
          exposedFilm,
          <>
            <ControlSlider
              label={t("sectors")}
              value={exposedFilm.sectors}
              min={2}
              max={32}
              step={1}
              onValueChange={(v) =>
                updateShaderConfig("exposedFilm", "sectors", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="exposedFilm-sectors"
              value={exposedFilm.sectors}
              min={2}
              max={32}
              step={1}
              onValueChange={(v) =>
                updateShaderConfig("exposedFilm", "sectors", v)
              }
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("rotationSpeed")}
              value={exposedFilm.rotationSpeed}
              min={0}
              max={10}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("exposedFilm", "rotationSpeed", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="exposedFilm-rotationSpeed"
              value={exposedFilm.rotationSpeed}
              min={0}
              max={10}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("exposedFilm", "rotationSpeed", v)
              }
              isRTL={isRTL}
            />
          </>
        )}
        {renderShaderControls("psychedelicGlass", psychedelicGlass, <>
          {/* SPEED */}
          <ControlSlider
            label={t("speed")}
            value={psychedelicGlass.speed}
            min={0}
            max={3}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("psychedelicGlass", "speed", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="psychedelicGlass-speed"
            value={psychedelicGlass.speed}
            min={0}
            max={3}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("psychedelicGlass", "speed", v)}
            isRTL={isRTL}
          />

          {/* SIDES */}
          <ControlSlider
            label={t("sides")}
            value={psychedelicGlass.sides}
            min={3}
            max={64}
            step={1}
            onValueChange={(v) => updateShaderConfig("psychedelicGlass", "sides", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="psychedelicGlass-sides"
            value={psychedelicGlass.sides}
            min={3}
            max={64}
            step={1}
            onValueChange={(v) => updateShaderConfig("psychedelicGlass", "sides", v)}
            isRTL={isRTL}
          />

          {/* DENSITY */}
          <ControlSlider
            label={t("density")}
            value={psychedelicGlass.density}
            min={0}
            max={100}
            step={0.1}
            onValueChange={(v) => updateShaderConfig("psychedelicGlass", "density", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="psychedelicGlass-density"
            value={psychedelicGlass.density}
            min={0}
            max={100}
            step={0.1}
            onValueChange={(v) => updateShaderConfig("psychedelicGlass", "density", v)}
            isRTL={isRTL}
          />

          {/* GLOW */}
          <ControlSlider
            label={t("glow")}
            value={psychedelicGlass.glow}
            min={0}
            max={3}
            step={0.1}
            onValueChange={(v) => updateShaderConfig("psychedelicGlass", "glow", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="psychedelicGlass-glow"
            value={psychedelicGlass.glow}
            min={0}
            max={3}
            step={0.1}
            onValueChange={(v) => updateShaderConfig("psychedelicGlass", "glow", v)}
            isRTL={isRTL}
          />

          {/* HUE */}
          <ControlSlider
            label={t("hue")}
            value={psychedelicGlass.hue}
            min={0}
            max={360}
            step={1}
            onValueChange={(v) => updateShaderConfig("psychedelicGlass", "hue", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="psychedelicGlass-hue"
            value={psychedelicGlass.hue}
            min={0}
            max={360}
            step={1}
            onValueChange={(v) => updateShaderConfig("psychedelicGlass", "hue", v)}
            isRTL={isRTL}
          />

          {/* SATURATION */}
          <ControlSlider
            label={t("saturation")}
            value={psychedelicGlass.saturation}
            min={0}
            max={2}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("psychedelicGlass", "saturation", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="psychedelicGlass-saturation"
            value={psychedelicGlass.saturation}
            min={0}
            max={2}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("psychedelicGlass", "saturation", v)}
            isRTL={isRTL}
          />

          {/* CONTRAST */}
          <ControlSlider
            label={t("contrast")}
            value={psychedelicGlass.contrast}
            min={0}
            max={3}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("psychedelicGlass", "contrast", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="psychedelicGlass-contrast"
            value={psychedelicGlass.contrast}
            min={0}
            max={3}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("psychedelicGlass", "contrast", v)}
            isRTL={isRTL}
          />
        </>)}
        {renderShaderControls(
          "solarWhirls",
          solarWhirls,
          <>
            {/* SPEED */}
            <ControlSlider
              label={t("speed")}
              value={solarWhirls.speed}
              min={0}
              max={5}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "speed", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="solarWhirls-speed"
              value={solarWhirls.speed}
              min={0}
              max={5}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "speed", v)}
              isRTL={isRTL}
            />

            {/* HUE */}
            <ControlSlider
              label={t("hue")}
              value={solarWhirls.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "hue", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="solarWhirls-hue"
              value={solarWhirls.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "hue", v)}
              isRTL={isRTL}
            />

            {/* SATURATION */}
            <ControlSlider
              label={t("saturation")}
              value={solarWhirls.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "saturation", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="solarWhirls-saturation"
              value={solarWhirls.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "saturation", v)}
              isRTL={isRTL}
            />

            {/* COLOR 1 */}
            <h4
              className="text-xs font-medium pt-2"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("color1")}
            </h4>
            <ControlSlider
              label={t("rgbR")}
              value={solarWhirls.color1_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "color1_r", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="solarWhirls-color1_r"
              value={solarWhirls.color1_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "color1_r", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbG")}
              value={solarWhirls.color1_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "color1_g", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="solarWhirls-color1_g"
              value={solarWhirls.color1_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "color1_g", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbB")}
              value={solarWhirls.color1_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "color1_b", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="solarWhirls-color1_b"
              value={solarWhirls.color1_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "color1_b", v)}
              isRTL={isRTL}
            />

            {/* COLOR 2 */}
            <h4
              className="text-xs font-medium pt-2"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("color2")}
            </h4>
            <ControlSlider
              label={t("rgbR")}
              value={solarWhirls.color2_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "color2_r", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="solarWhirls-color2_r"
              value={solarWhirls.color2_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "color2_r", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbG")}
              value={solarWhirls.color2_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "color2_g", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="solarWhirls-color2_g"
              value={solarWhirls.color2_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "color2_g", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbB")}
              value={solarWhirls.color2_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "color2_b", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="solarWhirls-color2_b"
              value={solarWhirls.color2_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "color2_b", v)}
              isRTL={isRTL}
            />

            {/* COLOR 3 */}
            <h4
              className="text-xs font-medium pt-2"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("color3")}
            </h4>
            <ControlSlider
              label={t("rgbR")}
              value={solarWhirls.color3_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "color3_r", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="solarWhirls-color3_r"
              value={solarWhirls.color3_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "color3_r", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbG")}
              value={solarWhirls.color3_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "color3_g", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="solarWhirls-color3_g"
              value={solarWhirls.color3_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "color3_g", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbB")}
              value={solarWhirls.color3_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "color3_b", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="solarWhirls-color3_b"
              value={solarWhirls.color3_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("solarWhirls", "color3_b", v)}
              isRTL={isRTL}
            />
          </>
        )}

        {renderShaderControls(
          "chargedCells",
          chargedCells,
          <>
            {/* SPEED */}
            <ControlSlider
              label={t("speed")}
              value={chargedCells.speed}
              min={1}
              max={15}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "speed", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="chargedCells-speed"
              value={chargedCells.speed}
              min={1}
              max={15}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "speed", v)}
              isRTL={isRTL}
            />

            {/* SCALE */}
            <ControlSlider
              label={t("scale")}
              value={chargedCells.scale}
              min={0.1}
              max={10}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("chargedCells", "scale", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="chargedCells-scale"
              value={chargedCells.scale}
              min={0.1}
              max={10}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("chargedCells", "scale", v)}
              isRTL={isRTL}
            />

            {/* HUE */}
            <ControlSlider
              label={t("hue")}
              value={chargedCells.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("chargedCells", "hue", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="chargedCells-hue"
              value={chargedCells.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("chargedCells", "hue", v)}
              isRTL={isRTL}
            />

            {/* SATURATION */}
            <ControlSlider
              label={t("saturation")}
              value={chargedCells.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("chargedCells", "saturation", v)
              }
              isRTL={isRTL}
            />
            <CustomSlider
              id="chargedCells-saturation"
              value={chargedCells.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) =>
                updateShaderConfig("chargedCells", "saturation", v)
              }
              isRTL={isRTL}
            />

            {/* COLOR 1 */}
            <h4
              className="text-xs font-medium pt-2"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("color1")}
            </h4>
            <ControlSlider
              label={t("rgbR")}
              value={chargedCells.color1_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "color1_r", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="chargedCells-color1_r"
              value={chargedCells.color1_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "color1_r", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbG")}
              value={chargedCells.color1_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "color1_g", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="chargedCells-color1_g"
              value={chargedCells.color1_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "color1_g", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbB")}
              value={chargedCells.color1_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "color1_b", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="chargedCells-color1_b"
              value={chargedCells.color1_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "color1_b", v)}
              isRTL={isRTL}
            />

            {/* COLOR 2 */}
            <h4
              className="text-xs font-medium pt-2"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("color2")}
            </h4>
            <ControlSlider
              label={t("rgbR")}
              value={chargedCells.color2_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "color2_r", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="chargedCells-color2_r"
              value={chargedCells.color2_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "color2_r", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbG")}
              value={chargedCells.color2_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "color2_g", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="chargedCells-color2_g"
              value={chargedCells.color2_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "color2_g", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbB")}
              value={chargedCells.color2_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "color2_b", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="chargedCells-color2_b"
              value={chargedCells.color2_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "color2_b", v)}
              isRTL={isRTL}
            />

            {/* COLOR 3 */}
            <h4
              className="text-xs font-medium pt-2"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t("color3")}
            </h4>
            <ControlSlider
              label={t("rgbR")}
              value={chargedCells.color3_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "color3_r", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="chargedCells-color3_r"
              value={chargedCells.color3_r}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "color3_r", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbG")}
              value={chargedCells.color3_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "color3_g", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="chargedCells-color3_g"
              value={chargedCells.color3_g}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "color3_g", v)}
              isRTL={isRTL}
            />
            <ControlSlider
              label={t("rgbB")}
              value={chargedCells.color3_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "color3_b", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="chargedCells-color3_b"
              value={chargedCells.color3_b}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("chargedCells", "color3_b", v)}
              isRTL={isRTL}
            />
          </>
        )}

        {renderShaderControls(
          "refractedWave",
          refractedWave,
          <>
            {/* SPEED */}
            <ControlSlider label={t("speed")} value={refractedWave.speed} min={0} max={5} step={0.1} onValueChange={(v) => updateShaderConfig("refractedWave", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="refractedWave-speed" value={refractedWave.speed} min={0} max={5} step={0.1} onValueChange={(v) => updateShaderConfig("refractedWave", "speed", v)} isRTL={isRTL} />

            {/* SOFTNESS */}
            <ControlSlider label={t("softness")} value={refractedWave.softness} min={0} max={1} step={0.05} onValueChange={(v) => updateShaderConfig("refractedWave", "softness", v)} isRTL={isRTL} />
            <CustomSlider id="refractedWave-softness" value={refractedWave.softness} min={0} max={1} step={0.05} onValueChange={(v) => updateShaderConfig("refractedWave", "softness", v)} isRTL={isRTL} />

            {/* WARP INTENSITY */}
            <ControlSlider label={t("warpIntensity")} value={refractedWave.intensity} min={0} max={1} step={0.05} onValueChange={(v) => updateShaderConfig("refractedWave", "intensity", v)} isRTL={isRTL} />
            <CustomSlider id="refractedWave-intensity" value={refractedWave.intensity} min={0} max={1} step={0.05} onValueChange={(v) => updateShaderConfig("refractedWave", "intensity", v)} isRTL={isRTL} />

            {/* GRAIN NOISE */}
            <ControlSlider label={t("grainNoise")} value={refractedWave.noise} min={0} max={1} step={0.05} onValueChange={(v) => updateShaderConfig("refractedWave", "noise", v)} isRTL={isRTL} />
            <CustomSlider id="refractedWave-noise" value={refractedWave.noise} min={0} max={1} step={0.05} onValueChange={(v) => updateShaderConfig("refractedWave", "noise", v)} isRTL={isRTL} />

            {/* SHAPE PROFILE */}
            <ControlSlider label={t("shapeProfile")} value={refractedWave.shape} min={1} max={3} step={1} onValueChange={(v) => updateShaderConfig("refractedWave", "shape", v)} isRTL={isRTL} />
            <CustomSlider id="refractedWave-shape" value={refractedWave.shape} min={1} max={3} step={1} onValueChange={(v) => updateShaderConfig("refractedWave", "shape", v)} isRTL={isRTL} />

            {/* COLOR COUNT */}
            <ControlSlider label={t("colorCount")} value={refractedWave.colorCount} min={1} max={7} step={1} onValueChange={(v) => updateShaderConfig("refractedWave", "colorCount", v)} isRTL={isRTL} />
            <CustomSlider id="refractedWave-colorCount" value={refractedWave.colorCount} min={1} max={7} step={1} onValueChange={(v) => updateShaderConfig("refractedWave", "colorCount", v)} isRTL={isRTL} />

            {/* DYNAMIC GRADIENT PICKERS */}
            {refractedWave.colors.slice(0, refractedWave.colorCount).map((color, index) => (
              <div key={index} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">
                  {t("color")} {index + 1}
                </span>
                <ColorPicker value={color} onValueChange={(c) => {
                  const updatedColors = [...refractedWave.colors];
                  updatedColors[index] = hsvaToHex(c);
                  updateShaderConfig("refractedWave", "colors", updatedColors);
                }} hideAlpha hideContrastRatio />
              </div>
            ))}
          </>
        )}

        {renderShaderControls(
          "swirl",
          swirl,
          <>
            {/* SPEED */}
            <ControlSlider label={t("speed")} value={swirl.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="swirl-speed" value={swirl.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "speed", v)} isRTL={isRTL} />

            {/* HUE */}
            <ControlSlider label={t("hue")} value={swirl.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("swirl", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="swirl-hue" value={swirl.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("swirl", "hue", v)} isRTL={isRTL} />

            {/* SATURATION */}
            <ControlSlider label={t("saturation")} value={swirl.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="swirl-saturation" value={swirl.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "saturation", v)} isRTL={isRTL} />

            {/* BAND COUNT */}
            <ControlSlider label={t("bandCount")} value={swirl.bandCount} min={0} max={15} step={1} onValueChange={(v) => updateShaderConfig("swirl", "bandCount", v)} isRTL={isRTL} />
            <CustomSlider id="swirl-bandCount" value={swirl.bandCount} min={0} max={15} step={1} onValueChange={(v) => updateShaderConfig("swirl", "bandCount", v)} isRTL={isRTL} />

            {/* TWIST */}
            <ControlSlider label={t("twist")} value={swirl.twist} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "twist", v)} isRTL={isRTL} />
            <CustomSlider id="swirl-twist" value={swirl.twist} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "twist", v)} isRTL={isRTL} />

            {/* CENTER */}
            <ControlSlider label={t("center")} value={swirl.center} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "center", v)} isRTL={isRTL} />
            <CustomSlider id="swirl-center" value={swirl.center} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "center", v)} isRTL={isRTL} />

            {/* PROPORTION */}
            <ControlSlider label={t("proportion")} value={swirl.proportion} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "proportion", v)} isRTL={isRTL} />
            <CustomSlider id="swirl-proportion" value={swirl.proportion} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "proportion", v)} isRTL={isRTL} />

            {/* SOFTNESS */}
            <ControlSlider label={t("softness")} value={swirl.softness} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "softness", v)} isRTL={isRTL} />
            <CustomSlider id="swirl-softness" value={swirl.softness} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "softness", v)} isRTL={isRTL} />

            {/* NOISE */}
            <ControlSlider label={t("noise")} value={swirl.noise} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "noise", v)} isRTL={isRTL} />
            <CustomSlider id="swirl-noise" value={swirl.noise} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "noise", v)} isRTL={isRTL} />

            {/* NOISE FREQUENCY */}
            <ControlSlider label={t("noiseFrequency")} value={swirl.noiseFrequency} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "noiseFrequency", v)} isRTL={isRTL} />
            <CustomSlider id="swirl-noiseFrequency" value={swirl.noiseFrequency} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "noiseFrequency", v)} isRTL={isRTL} />

            {/* COLOR COUNT */}
            <ControlSlider label={t("colorCount")} value={swirl.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("swirl", "colorCount", v)} isRTL={isRTL} />
            <CustomSlider id="swirl-colorCount" value={swirl.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("swirl", "colorCount", v)} isRTL={isRTL} />

            {/* BACKGROUND COLOR PICKER */}
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">
                {t("backgroundColor")}
              </span>
              <ColorPicker value={swirl.colorBack} onValueChange={(c) => {
                updateShaderConfig("swirl", "colorBack", hsvaToHex(c));
              }} hideAlpha hideContrastRatio />
            </div>

            {/* DYNAMIC GRADIENT PICKERS */}
            {swirl.colors.slice(0, swirl.colorCount).map((color, index) => (
              <div key={index} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">
                  {t("color")} {index + 1}
                </span>
                <ColorPicker value={color} onValueChange={(c) => {
                  const updatedColors = [...swirl.colors];
                  updatedColors[index] = hsvaToHex(c);
                  updateShaderConfig("swirl", "colors", updatedColors);
                }} hideAlpha hideContrastRatio />
              </div>
            ))}
          </>
        )}

        {renderShaderControls(
          "spiral",
          spiral,
          <>
            {/* SPEED */}
            <ControlSlider label={t("speed")} value={spiral.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("spiral", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="spiral-speed" value={spiral.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("spiral", "speed", v)} isRTL={isRTL} />

            {/* DENSITY */}
            <ControlSlider label={t("density")} value={spiral.density} min={0} max={64} step={0.01} onValueChange={(v) => updateShaderConfig("spiral", "density", v)} isRTL={isRTL} />
            <CustomSlider id="spiral-density" value={spiral.density} min={0} max={64} step={0.01} onValueChange={(v) => updateShaderConfig("spiral", "density", v)} isRTL={isRTL} />

            {/* DISTORTION */}
            <ControlSlider label={t("distortion")} value={spiral.distortion} min={0} max={25} step={0.01} onValueChange={(v) => updateShaderConfig("spiral", "distortion", v)} isRTL={isRTL} />
            <CustomSlider id="spiral-distortion" value={spiral.distortion} min={0} max={25} step={0.01} onValueChange={(v) => updateShaderConfig("spiral", "distortion", v)} isRTL={isRTL} />

            {/* STROKE WIDTH */}
            <ControlSlider label={t("strokeWidth")} value={spiral.strokeWidth} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("spiral", "strokeWidth", v)} isRTL={isRTL} />
            <CustomSlider id="spiral-strokeWidth" value={spiral.strokeWidth} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("spiral", "strokeWidth", v)} isRTL={isRTL} />

            {/* STROKE TAPER */}
            <ControlSlider label={t("strokeTaper")} value={spiral.strokeTaper} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("spiral", "strokeTaper", v)} isRTL={isRTL} />
            <CustomSlider id="spiral-strokeTaper" value={spiral.strokeTaper} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("spiral", "strokeTaper", v)} isRTL={isRTL} />

            {/* NOISE */}
            <ControlSlider label={t("noise")} value={spiral.noise} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("spiral", "noise", v)} isRTL={isRTL} />
            <CustomSlider id="spiral-noise" value={spiral.noise} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("spiral", "noise", v)} isRTL={isRTL} />

            {/* NOISE FREQUENCY */}
            <ControlSlider label={t("noiseFrequency")} value={spiral.noiseFrequency} min={0} max={5} step={0.01} onValueChange={(v) => updateShaderConfig("spiral", "noiseFrequency", v)} isRTL={isRTL} />
            <CustomSlider id="spiral-noiseFrequency" value={spiral.noiseFrequency} min={0} max={5} step={0.01} onValueChange={(v) => updateShaderConfig("spiral", "noiseFrequency", v)} isRTL={isRTL} />

            {/* SOFTNESS */}
            <ControlSlider label={t("softness")} value={spiral.softness} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("spiral", "softness", v)} isRTL={isRTL} />
            <CustomSlider id="spiral-softness" value={spiral.softness} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("spiral", "softness", v)} isRTL={isRTL} />

            {/* COLOR FRONT */}
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">
                {t("frontColor")}
              </span>
              <ColorPicker value={spiral.colorFront} onValueChange={(c) => {
                updateShaderConfig("spiral", "colorFront", hsvaToHex(c));
              }} hideAlpha hideContrastRatio />
            </div>

            {/* COLOR BACK */}
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">
                {t("backgroundColor")}
              </span>
              <ColorPicker value={spiral.colorBack} onValueChange={(c) => {
                updateShaderConfig("spiral", "colorBack", hsvaToHex(c));
              }} hideAlpha hideContrastRatio />
            </div>
          </>
        )}

        {renderShaderControls(
          "neuralNoise",
          neuralNoise,
          <>
            {/* SPEED */}
            <ControlSlider label={t("speed")} value={neuralNoise.speed} min={0} max={5} step={0.01} onValueChange={(v) => updateShaderConfig("neuralNoise", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="neuralNoise-speed" value={neuralNoise.speed} min={0} max={5} step={0.01} onValueChange={(v) => updateShaderConfig("neuralNoise", "speed", v)} isRTL={isRTL} />

            {/* HUE OFFSET CONTROL */}
            <ControlSlider label={t("hue")} value={neuralNoise.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("neuralNoise", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="neuralNoise-hue" value={neuralNoise.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("neuralNoise", "hue", v)} isRTL={isRTL} />

            {/* SATURATION MULTIPLIER */}
            <ControlSlider label={t("saturation")} value={neuralNoise.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("neuralNoise", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="neuralNoise-saturation" value={neuralNoise.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("neuralNoise", "saturation", v)} isRTL={isRTL} />

            {/* BASE COLOR ORIGIN SELECTION */}
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">
                {t("baseColor")}
              </span>
              <ColorPicker value={neuralNoise.color} onValueChange={(c) => {
                updateShaderConfig("neuralNoise", "color", hsvaToHex(c));
              }} hideAlpha hideContrastRatio />
            </div>

            {/* COLOR METAMORPHOSIS SPEED */}
            <ControlSlider label={t("colorShiftSpeed")} value={neuralNoise.colorShiftSpeed} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("neuralNoise", "colorShiftSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="neuralNoise-colorShiftSpeed" value={neuralNoise.colorShiftSpeed} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("neuralNoise", "colorShiftSpeed", v)} isRTL={isRTL} />

            {/* ITERATIONS */}
            <ControlSlider label={t("iterations")} value={neuralNoise.iterations} min={1} max={32} step={1} onValueChange={(v) => updateShaderConfig("neuralNoise", "iterations", v)} isRTL={isRTL} />
            <CustomSlider id="neuralNoise-iterations" value={neuralNoise.iterations} min={1} max={32} step={1} onValueChange={(v) => updateShaderConfig("neuralNoise", "iterations", v)} isRTL={isRTL} />

            {/* COMPLEXITY */}
            <ControlSlider label={t("complexity")} value={neuralNoise.complexity} min={0} max={10} step={0.05} onValueChange={(v) => updateShaderConfig("neuralNoise", "complexity", v)} isRTL={isRTL} />
            <CustomSlider id="neuralNoise-complexity" value={neuralNoise.complexity} min={0} max={10} step={0.05} onValueChange={(v) => updateShaderConfig("neuralNoise", "complexity", v)} isRTL={isRTL} />
            
            {/* SCALE MULTIPLIER STEP */}
            <ControlSlider label={t("distance")} value={neuralNoise.distance} min={1.0} max={1.5} step={0.01} onValueChange={(v) => updateShaderConfig("neuralNoise", "distance", v)} isRTL={isRTL} />
            <CustomSlider id="neuralNoise-distance" value={neuralNoise.distance} min={1.0} max={1.5} step={0.01} onValueChange={(v) => updateShaderConfig("neuralNoise", "distance", v)} isRTL={isRTL} />

            {/* BRIGHTNESS */}
            <ControlSlider label={t("brightness")} value={neuralNoise.brightness} min={0.1} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("neuralNoise", "brightness", v)} isRTL={isRTL} />
            <CustomSlider id="neuralNoise-brightness" value={neuralNoise.brightness} min={0.1} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("neuralNoise", "brightness", v)} isRTL={isRTL} />

            {/* CONTRAST */}
            <ControlSlider label={t("contrast")} value={neuralNoise.contrast} min={0.0} max={2.0} step={0.01} onValueChange={(v) => updateShaderConfig("neuralNoise", "contrast", v)} isRTL={isRTL} />
            <CustomSlider id="neuralNoise-contrast" value={neuralNoise.contrast} min={0.0} max={2.0} step={0.01} onValueChange={(v) => updateShaderConfig("neuralNoise", "contrast", v)} isRTL={isRTL} />

            {/* VIGNETTE */}
            <ControlSlider label={t("vignette")} value={neuralNoise.vignette} min={0.0} max={2.0} step={0.05} onValueChange={(v) => updateShaderConfig("neuralNoise", "vignette", v)} isRTL={isRTL} />
            <CustomSlider id="neuralNoise-vignette" value={neuralNoise.vignette} min={0.0} max={2.0} step={0.05} onValueChange={(v) => updateShaderConfig("neuralNoise", "vignette", v)} isRTL={isRTL} />
          </>
        )}
        
        {renderShaderControls(
          "interstellar",
          interstellar,
          <>
            {/* LUMINANCE */}
            <ControlSlider label={t("brightness")} value={interstellar.luminance} min={0.1} max={15.0} step={0.1} onValueChange={(v) => updateShaderConfig("interstellar", "luminance", v)} isRTL={isRTL} />
            <CustomSlider id="interstellar-luminance" value={interstellar.luminance} min={0.1} max={15.0} step={0.1} onValueChange={(v) => updateShaderConfig("interstellar", "luminance", v)} isRTL={isRTL} />

            {/* GRAIN */}
            <ControlSlider label={t("grainNoise")} value={interstellar.grain} min={0.0} max={0.2} step={0.01} onValueChange={(v) => updateShaderConfig("interstellar", "grain", v)} isRTL={isRTL} />
            <CustomSlider id="interstellar-grain" value={interstellar.grain} min={0.0} max={0.2} step={0.01} onValueChange={(v) => updateShaderConfig("interstellar", "grain", v)} isRTL={isRTL} />

            {/* SOLIDITY */}
            <ControlSlider label={t("solidity")} value={interstellar.solidity} min={0.5} max={3.0} step={0.1} onValueChange={(v) => updateShaderConfig("interstellar", "solidity", v)} isRTL={isRTL} />
            <CustomSlider id="interstellar-solidity" value={interstellar.solidity} min={0.5} max={3.0} step={0.1} onValueChange={(v) => updateShaderConfig("interstellar", "solidity", v)} isRTL={isRTL} />

            {/* PRECISION */}
            <ControlSlider label={t("precision")} value={interstellar.precision} min={0.1} max={1.0} step={0.01} onValueChange={(v) => updateShaderConfig("interstellar", "precision", v)} isRTL={isRTL} />
            <CustomSlider id="interstellar-precision" value={interstellar.precision} min={0.1} max={1.0} step={0.01} onValueChange={(v) => updateShaderConfig("interstellar", "precision", v)} isRTL={isRTL} />

            {/* ITERATIONS */}
            <ControlSlider label={t("iterations")} value={interstellar.iterations} min={10} max={80} step={1} onValueChange={(v) => updateShaderConfig("interstellar", "iterations", v)} isRTL={isRTL} />
            <CustomSlider id="interstellar-iterations" value={interstellar.iterations} min={10} max={80} step={1} onValueChange={(v) => updateShaderConfig("interstellar", "iterations", v)} isRTL={isRTL} />

            {/* PASSES */}
            <ControlSlider label={t("passes")} value={interstellar.passes} min={1} max={4} step={1} onValueChange={(v) => updateShaderConfig("interstellar", "passes", v)} isRTL={isRTL} />
            <CustomSlider id="interstellar-passes" value={interstellar.passes} min={1} max={4} step={1} onValueChange={(v) => updateShaderConfig("interstellar", "passes", v)} isRTL={isRTL} />

            {/* SPEED */}
            <ControlSlider label={t("speed")} value={interstellar.speed} min={0.0} max={5.0} step={0.1} onValueChange={(v) => updateShaderConfig("interstellar", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="interstellar-speed" value={interstellar.speed} min={0.0} max={5.0} step={0.1} onValueChange={(v) => updateShaderConfig("interstellar", "speed", v)} isRTL={isRTL} />

            {/* CAM X */}
            <ControlSlider label={t("camX")} value={interstellar.camX} min={-5.0} max={10.0} step={0.1} onValueChange={(v) => updateShaderConfig("interstellar", "camX", v)} isRTL={isRTL} />
            <CustomSlider id="interstellar-camX" value={interstellar.camX} min={-5.0} max={10.0} step={0.1} onValueChange={(v) => updateShaderConfig("interstellar", "camX", v)} isRTL={isRTL} />

            {/* CAM Y */}
            <ControlSlider label={t("camY")} value={interstellar.camY} min={-5.0} max={5.0} step={0.1} onValueChange={(v) => updateShaderConfig("interstellar", "camY", v)} isRTL={isRTL} />
            <CustomSlider id="interstellar-camY" value={interstellar.camY} min={-5.0} max={5.0} step={0.1} onValueChange={(v) => updateShaderConfig("interstellar", "camY", v)} isRTL={isRTL} />

            {/* PITCH */}
            <ControlSlider label={t("camPitch")} value={interstellar.camPitch} min={-1.5} max={1.5} step={0.01} onValueChange={(v) => updateShaderConfig("interstellar", "camPitch", v)} isRTL={isRTL} />
            <CustomSlider id="interstellar-camPitch" value={interstellar.camPitch} min={-1.5} max={1.5} step={0.01} onValueChange={(v) => updateShaderConfig("interstellar", "camPitch", v)} isRTL={isRTL} />

            {/* FOV */}
            <ControlSlider label={t("proximityScale")} value={interstellar.camFov} min={0.5} max={5.0} step={0.1} onValueChange={(v) => updateShaderConfig("interstellar", "camFov", v)} isRTL={isRTL} />
            <CustomSlider id="interstellar-camFov" value={interstellar.camFov} min={0.5} max={5.0} step={0.1} onValueChange={(v) => updateShaderConfig("interstellar", "camFov", v)} isRTL={isRTL} />

            {/* SHIFT X */}
            <ControlSlider label={t("camShiftX")} value={interstellar.camShiftX} min={-2.0} max={5.0} step={0.1} onValueChange={(v) => updateShaderConfig("interstellar", "camShiftX", v)} isRTL={isRTL} />
            <CustomSlider id="interstellar-camShiftX" value={interstellar.camShiftX} min={-2.0} max={5.0} step={0.1} onValueChange={(v) => updateShaderConfig("interstellar", "camShiftX", v)} isRTL={isRTL} />

            {/* SHIFT Y */}
            <ControlSlider label={t("camShiftY")} value={interstellar.camShiftY} min={-2.0} max={5.0} step={0.1} onValueChange={(v) => updateShaderConfig("interstellar", "camShiftY", v)} isRTL={isRTL} />
            <CustomSlider id="interstellar-camShiftY" value={interstellar.camShiftY} min={-2.0} max={5.0} step={0.1} onValueChange={(v) => updateShaderConfig("interstellar", "camShiftY", v)} isRTL={isRTL} />
          </>
        )}

        {renderShaderControls(
          "corrodedSpiral",
          corrodedSpiral,
          <>
            {/* SPEED */}
            <ControlSlider label={t("speed")} value={corrodedSpiral.speed} min={0} max={5} step={0.01} onValueChange={(v) => updateShaderConfig("corrodedSpiral", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="corrodedSpiral-speed" value={corrodedSpiral.speed} min={0} max={5} step={0.01} onValueChange={(v) => updateShaderConfig("corrodedSpiral", "speed", v)} isRTL={isRTL} />
            
            {/* HUE */}
            <ControlSlider label={t("hue")} value={corrodedSpiral.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("corrodedSpiral", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="corrodedSpiral-hue" value={corrodedSpiral.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("corrodedSpiral", "hue", v)} isRTL={isRTL} />
            
            {/* SATURATION */}
            <ControlSlider label={t("saturation")} value={corrodedSpiral.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("corrodedSpiral", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="corrodedSpiral-saturation" value={corrodedSpiral.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("corrodedSpiral", "saturation", v)} isRTL={isRTL} />

            {/* CORROSION ZOOM */}
            <ControlSlider label={t("corrosionZoom")} value={corrodedSpiral.corrosionZoom} min={0.5} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("corrodedSpiral", "corrosionZoom", v)} isRTL={isRTL} />
            <CustomSlider id="corrodedSpiral-corrosionZoom" value={corrodedSpiral.corrosionZoom} min={0.5} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("corrodedSpiral", "corrosionZoom", v)} isRTL={isRTL} />

            {/* OCTAVES */}
            <ControlSlider label={t("octaves")} value={corrodedSpiral.octaves} min={1} max={8} step={1} onValueChange={(v) => updateShaderConfig("corrodedSpiral", "octaves", v)} isRTL={isRTL} />
            <CustomSlider id="corrodedSpiral-octaves" value={corrodedSpiral.octaves} min={1} max={8} step={1} onValueChange={(v) => updateShaderConfig("corrodedSpiral", "octaves", v)} isRTL={isRTL} />

            {/* PERSISTENCE */}
            <ControlSlider label={t("persistence")} value={corrodedSpiral.persistence} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("corrodedSpiral", "persistence", v)} isRTL={isRTL} />
            <CustomSlider id="corrodedSpiral-persistence" value={corrodedSpiral.persistence} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("corrodedSpiral", "persistence", v)} isRTL={isRTL} />

            {/* LACUNARITY */}
            <ControlSlider label={t("lacunarity")} value={corrodedSpiral.lacunarity} min={1} max={5} step={0.1} onValueChange={(v) => updateShaderConfig("corrodedSpiral", "lacunarity", v)} isRTL={isRTL} />
            <CustomSlider id="corrodedSpiral-lacunarity" value={corrodedSpiral.lacunarity} min={1} max={5} step={0.1} onValueChange={(v) => updateShaderConfig("corrodedSpiral", "lacunarity", v)} isRTL={isRTL} />

            {/* SPIRAL DENSITY */}
            <ControlSlider label={t("spiralDensity")} value={corrodedSpiral.spiralDensity} min={1.0} max={40.0} step={1} onValueChange={(v) => updateShaderConfig("corrodedSpiral", "spiralDensity", v)} isRTL={isRTL} />
            <CustomSlider id="corrodedSpiral-spiralDensity" value={corrodedSpiral.spiralDensity} min={1.0} max={40.0} step={1} onValueChange={(v) => updateShaderConfig("corrodedSpiral", "spiralDensity", v)} isRTL={isRTL} />

            {/* INTENSITY */}
            <ControlSlider label={t("intensity")} value={corrodedSpiral.intensity} min={0.1} max={5} step={0.1} onValueChange={(v) => updateShaderConfig("corrodedSpiral", "intensity", v)} isRTL={isRTL} />
            <CustomSlider id="corrodedSpiral-intensity" value={corrodedSpiral.intensity} min={0.1} max={5} step={0.1} onValueChange={(v) => updateShaderConfig("corrodedSpiral", "intensity", v)} isRTL={isRTL} />
          </>
        )}

        {renderShaderControls(
          "spiralTunnel",
          spiralTunnel,
          <>
            {/* Spiral Tunnel: Animation and Path Controls */}
            <ControlSlider
              label={t("speed")}
              value={spiralTunnel.flightSpeed}
              min={0.0}
              max={60.0}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "flightSpeed", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="tunnel-flightSpeed"
              value={spiralTunnel.flightSpeed}
              min={0.0}
              max={60.0}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "flightSpeed", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("fieldOfView")}
              value={spiralTunnel.fieldOfView}
              min={6}
              max={179}
              step={1}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "fieldOfView", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="tunnel-fieldOfView"
              value={spiralTunnel.fieldOfView}
              min={6}
              max={179}
              step={1}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "fieldOfView", v)}
              isRTL={isRTL}
            />

            {/* Spiral Tunnel: Structural Parameters */}
            <ControlSlider
              label={t("luminosity")}
              value={spiralTunnel.luminosity}
              min={5.0}
              max={18.0}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "luminosity", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="tunnel-luminosity"
              value={spiralTunnel.luminosity}
              min={5.0}
              max={18.0}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "luminosity", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("openingSize")}
              value={spiralTunnel.openingSize}
              min={0}
              max={500}
              step={1}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "openingSize", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="tunnel-openingSize"
              value={spiralTunnel.openingSize}
              min={0}
              max={500}
              step={1}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "openingSize", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("ribbonCount")}
              value={spiralTunnel.ribbonCount}
              min={10}
              max={500}
              step={1}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "ribbonCount", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="tunnel-ribbonCount"
              value={spiralTunnel.ribbonCount}
              min={10}
              max={500}
              step={10}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "ribbonCount", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("ribbonWidth")}
              value={spiralTunnel.ribbonWidth}
              min={0.0}
              max={0.5}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "ribbonWidth", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="tunnel-ribbonWidth"
              value={spiralTunnel.ribbonWidth}
              min={0.0}
              max={0.5}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "ribbonWidth", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("spiralDensity")}
              value={spiralTunnel.spiralDensity}
              min={1.0}
              max={100.0}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "spiralDensity", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="tunnel-spiralDensity"
              value={spiralTunnel.spiralDensity}
              min={1.0}
              max={100.0}
              step={0.1}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "spiralDensity", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("spiralCount")}
              value={spiralTunnel.spiralCount}
              min={1}
              max={12}
              step={1}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "spiralCount", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="tunnel-spiralCount"
              value={spiralTunnel.spiralCount}
              min={1}
              max={12}
              step={1}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "spiralCount", v)}
              isRTL={isRTL}
            />

            {/* Spiral Tunnel: Light & Core Passes */}
            <ControlSlider
              label={t("lightIntensity")}
              value={spiralTunnel.lightIntensity}
              min={0.2}
              max={5.0}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "lightIntensity", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="tunnel-lightIntensity"
              value={spiralTunnel.lightIntensity}
              min={0.2}
              max={5.0}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "lightIntensity", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("distortion")}
              value={spiralTunnel.distortion}
              min={0.0}
              max={100.0}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "distortion", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="tunnel-distortion"
              value={spiralTunnel.distortion}
              min={0.0}
              max={100.0}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "distortion", v)}
              isRTL={isRTL}
            />

            {/* Spiral Tunnel: Color Shifts */}
            <ControlSlider
              label={t("hue")}
              value={spiralTunnel.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "hue", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="tunnel-hue"
              value={spiralTunnel.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "hue", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("saturation")}
              value={spiralTunnel.saturation}
              min={0.0}
              max={2.0}
              step={0.05}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "saturation", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="tunnel-saturation"
              value={spiralTunnel.saturation}
              min={0.0}
              max={2.0}
              step={0.05}
              onValueChange={(v) => updateShaderConfig("spiralTunnel", "saturation", v)}
              isRTL={isRTL}
            />

            {/* DYNAMIC GRADIENT PICKERS */}
            {[spiralTunnel.lineColor1, spiralTunnel.lineColor2, spiralTunnel.lineColor3, spiralTunnel.lineColor4].map((color, index) => (
              <div key={index} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">
                  {t("color")} {index + 1}
                </span>
                <ColorPicker 
                  value={color} 
                  onValueChange={(c) => {
                    updateShaderConfig("spiralTunnel", `lineColor${index + 1}`, hsvaToHex(c));
                  }} 
                  hideAlpha 
                  hideContrastRatio 
                />
              </div>
            ))}
          </>
        )}

        {renderShaderControls(
          "fractalVortex",
          fractalVortex,
          <>
            {/* RENDER SCALE (Resolution Scale / Render Factor Pro) */}
            <ControlSlider
              label={t("renderScale")}
              value={fractalVortex.renderScale ?? 0.6}
              min={0.1}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "renderScale", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="fractalVortex-renderScale"
              value={fractalVortex.renderScale ?? 0.6}
              min={0.1}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "renderScale", v)}
              isRTL={isRTL}
            />
            {/* SPEED */}
            <ControlSlider
              label={t("cameraSpeed")}
              value={fractalVortex.cameraSpeed}
              min={0}
              max={50}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "cameraSpeed", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="fractalVortex-cameraSpeed"
              value={fractalVortex.cameraSpeed}
              min={0}
              max={50}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "cameraSpeed", v)}
              isRTL={isRTL}
            />

            {/* FRACTAL SPEED */}
            <ControlSlider
              label={t("fractalSpeed")}
              value={fractalVortex.fractalSpeed}
              min={0}
              max={50}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "fractalSpeed", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="fractalVortex-fractalSpeed"
              value={fractalVortex.fractalSpeed}
              min={0}
              max={50}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "fractalSpeed", v)}
              isRTL={isRTL}
            />

            {/* FIELD OF VIEW */}
            <ControlSlider
              label={t("fieldOfView")}
              value={fractalVortex.fov}
              min={0.1}
              max={9}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "fov", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="fractalVortex-fov"
              value={fractalVortex.fov}
              min={0.1}
              max={9}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "fov", v)}
              isRTL={isRTL}
            />

            {/* FRACTAL SCALE */}
            <ControlSlider
              label={t("fractalScale")}
              value={fractalVortex.fractalScale}
              min={0.1}
              max={8}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "fractalScale", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="fractalVortex-fractalScale"
              value={fractalVortex.fractalScale}
              min={0.1}
              max={8}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "fractalScale", v)}
              isRTL={isRTL}
            />

            {/* TURBULENCE */}
            <ControlSlider
              label={t("turbulence")}
              value={fractalVortex.turbulence}
              min={0}
              max={60}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "turbulence", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="fractalVortex-turbulence"
              value={fractalVortex.turbulence}
              min={0}
              max={60}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "turbulence", v)}
              isRTL={isRTL}
            />

            {/* BOX SIZE */}
            <ControlSlider
              label={t("boxSize")}
              value={fractalVortex.boxSize}
              min={0.1}
              max={3}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "boxSize", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="fractalVortex-boxSize"
              value={fractalVortex.boxSize}
              min={0.1}
              max={3}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "boxSize", v)}
              isRTL={isRTL}
            />

            {/* GLOW STRENGTH */}
            <ControlSlider
              label={t("glowStrength")}
              value={fractalVortex.glowStrength}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "glowStrength", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="fractalVortex-glowStrength"
              value={fractalVortex.glowStrength}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "glowStrength", v)}
              isRTL={isRTL}
            />

            {/* GLOW WIDTH */}
            <ControlSlider
              label={t("glowWidth")}
              value={fractalVortex.glowWidth}
              min={0.001}
              max={1}
              step={0.001}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "glowWidth", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="fractalVortex-glowWidth"
              value={fractalVortex.glowWidth}
              min={0.001}
              max={1}
              step={0.001}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "glowWidth", v)}
              isRTL={isRTL}
            />

            {/* MIRROR TILE SIZE */}
            <ControlSlider
              label={t("mirrorTileSize")}
              value={fractalVortex.mirrorTileSize}
              min={0.1}
              max={10}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "mirrorTileSize", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="fractalVortex-mirrorTileSize"
              value={fractalVortex.mirrorTileSize}
              min={0.1}
              max={10}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "mirrorTileSize", v)}
              isRTL={isRTL}
            />

            {/* WALL NORMAL SCALE */}
            <ControlSlider
              label={t("wallScale")}
              value={fractalVortex.wallNormalScale}
              min={0}
              max={5}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "wallNormalScale", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="fractalVortex-wallNormalScale"
              value={fractalVortex.wallNormalScale}
              min={0}
              max={5}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "wallNormalScale", v)}
              isRTL={isRTL}
            />

            {/* EXPOSURE */}
            <ControlSlider
              label={t("exposure")}
              value={fractalVortex.exposure}
              min={0.1}
              max={10}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "exposure", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="fractalVortex-exposure"
              value={fractalVortex.exposure}
              min={0.1}
              max={10}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "exposure", v)}
              isRTL={isRTL}
            />

            {/* HUE */}
            <ControlSlider
              label={t("hue")}
              value={fractalVortex.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "hue", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="fractalVortex-hue"
              value={fractalVortex.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "hue", v)}
              isRTL={isRTL}
            />

            {/* SATURATION */}
            <ControlSlider
              label={t("saturation")}
              value={fractalVortex.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "saturation", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="fractalVortex-saturation"
              value={fractalVortex.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("fractalVortex", "saturation", v)}
              isRTL={isRTL}
            />
          </>
        )}
{renderShaderControls(
          "infiniteCorridor",
          infiniteCorridor,
          <>
            {/* GLOBAL HUE / SATURATION OVERRIDES */}
            <ControlSlider label={t("hue")} value={infiniteCorridor.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-hue" value={infiniteCorridor.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={infiniteCorridor.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-saturation" value={infiniteCorridor.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "saturation", v)} isRTL={isRTL} />

            {/* --- CORRIDOR GEOMETRY MATRICES --- */}
            <ControlSlider label={t("floorY")} value={infiniteCorridor.floorY} min={-2.0} max={0.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "floorY", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-floorY" value={infiniteCorridor.floorY} min={-2.0} max={0.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "floorY", v)} isRTL={isRTL} />

            <ControlSlider label={t("apexY")} value={infiniteCorridor.apexY} min={0.0} max={3.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "apexY", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-apexY" value={infiniteCorridor.apexY} min={0.0} max={3.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "apexY", v)} isRTL={isRTL} />

            <ControlSlider label={t("halfWidth")} value={infiniteCorridor.halfWidth} min={0.1} max={3.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "halfWidth", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-halfWidth" value={infiniteCorridor.halfWidth} min={0.1} max={3.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "halfWidth", v)} isRTL={isRTL} />

            <ControlSlider label={t("focalLength")} value={infiniteCorridor.focalLength} min={0.1} max={24.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "focalLength", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-focalLength" value={infiniteCorridor.focalLength} min={0.1} max={24.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "focalLength", v)} isRTL={isRTL} />

            <ControlSlider label={t("fogDensity")} value={infiniteCorridor.fogDensity} min={0.0} max={0.5} step={0.001} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "fogDensity", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-fogDensity" value={infiniteCorridor.fogDensity} min={0.0} max={0.5} step={0.001} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "fogDensity", v)} isRTL={isRTL} />

            {/* --- ENGINE TIMING SYSTEMS --- */}
            <ControlSlider label={t("fractalTimeScale")} value={infiniteCorridor.fractalTimeScale} min={0.0} max={3.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "fractalTimeScale", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-fractalTimeScale" value={infiniteCorridor.fractalTimeScale} min={0.0} max={3.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "fractalTimeScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("trailTimeScale")} value={infiniteCorridor.trailTimeScale} min={0.0} max={3.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "trailTimeScale", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-trailTimeScale" value={infiniteCorridor.trailTimeScale} min={0.0} max={3.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "trailTimeScale", v)} isRTL={isRTL} />

            {/* --- FRACTAL PATTERN STRUCTURES --- */}
            <ControlSlider label={t("fractalScaleX")} value={infiniteCorridor.fractalScaleX} min={0.05} max={2.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "fractalScaleX", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-fractalScaleX" value={infiniteCorridor.fractalScaleX} min={0.05} max={2.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "fractalScaleX", v)} isRTL={isRTL} />

            <ControlSlider label={t("fractalScaleY")} value={infiniteCorridor.fractalScaleY} min={0.05} max={2.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "fractalScaleY", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-fractalScaleY" value={infiniteCorridor.fractalScaleY} min={0.05} max={2.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "fractalScaleY", v)} isRTL={isRTL} />

            <ControlSlider label={t("fractalScroll")} value={infiniteCorridor.fractalScroll} min={-2.0} max={2.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "fractalScroll", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-fractalScroll" value={infiniteCorridor.fractalScroll} min={-2.0} max={2.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "fractalScroll", v)} isRTL={isRTL} />

            <ControlSlider label={t("fractalLevels")} value={infiniteCorridor.fractalLevels} min={1.0} max={6.0} step={1.0} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "fractalLevels", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-fractalLevels" value={infiniteCorridor.fractalLevels} min={1.0} max={6.0} step={1.0} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "fractalLevels", v)} isRTL={isRTL} />

            <ControlSlider label={t("lineWidthNear")} value={infiniteCorridor.lineWidthNear} min={-0.05} max={0.05} step={0.001} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "lineWidthNear", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-lineWidthNear" value={infiniteCorridor.lineWidthNear} min={-0.05} max={0.05} step={0.001} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "lineWidthNear", v)} isRTL={isRTL} />

            <ControlSlider label={t("lineWidthFar")} value={infiniteCorridor.lineWidthFar} min={0.0} max={0.1} step={0.001} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "lineWidthFar", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-lineWidthFar" value={infiniteCorridor.lineWidthFar} min={0.0} max={0.1} step={0.001} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "lineWidthFar", v)} isRTL={isRTL} />

            <ControlSlider label={t("lineSoftness")} value={infiniteCorridor.lineSoftness} min={0.0} max={0.05} step={0.001} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "lineSoftness", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-lineSoftness" value={infiniteCorridor.lineSoftness} min={0.0} max={0.05} step={0.001} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "lineSoftness", v)} isRTL={isRTL} />

            {/* --- CAMERA NAVIGATIONS --- */}
            <ControlSlider label={t("cameraSpeed")} value={infiniteCorridor.cameraSpeed} min={0.0} max={5.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "cameraSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-cameraSpeed" value={infiniteCorridor.cameraSpeed} min={0.0} max={5.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "cameraSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraX")} value={infiniteCorridor.cameraX} min={-2.0} max={2.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "cameraX", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-cameraX" value={infiniteCorridor.cameraX} min={-2.0} max={2.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "cameraX", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraY")} value={infiniteCorridor.cameraY} min={-2.0} max={2.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "cameraY", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-cameraY" value={infiniteCorridor.cameraY} min={-2.0} max={2.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "cameraY", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraZ")} value={infiniteCorridor.cameraZ} min={-10.0} max={10.0} step={0.1} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "cameraZ", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-cameraZ" value={infiniteCorridor.cameraZ} min={-10.0} max={10.0} step={0.1} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "cameraZ", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraSwayX")} value={infiniteCorridor.cameraSwayX} min={0.0} max={1.0} step={0.001} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "cameraSwayX", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-cameraSwayX" value={infiniteCorridor.cameraSwayX} min={0.0} max={1.0} step={0.001} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "cameraSwayX", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraSwayY")} value={infiniteCorridor.cameraSwayY} min={0.0} max={1.0} step={0.001} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "cameraSwayY", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-cameraSwayY" value={infiniteCorridor.cameraSwayY} min={0.0} max={1.0} step={0.001} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "cameraSwayY", v)} isRTL={isRTL} />

            {/* --- RENDER EFFECTS --- */}
            <ControlSlider label={t("seamStrength")} value={infiniteCorridor.seamStrength} min={0.0} max={10.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "seamStrength", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-seamStrength" value={infiniteCorridor.seamStrength} min={0.0} max={10.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "seamStrength", v)} isRTL={isRTL} />

            <ControlSlider label={t("trailBrightness")} value={infiniteCorridor.trailBrightness} min={0.0} max={2.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "trailBrightness", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-trailBrightness" value={infiniteCorridor.trailBrightness} min={0.0} max={2.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "trailBrightness", v)} isRTL={isRTL} />

            {/* --- MODULATION SPECTRUMS --- */}
            <ControlSlider label={t("oscillationSpeed")} value={infiniteCorridor.fateSpeed} min={0.0} max={5.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "fateSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-fateSpeed" value={infiniteCorridor.fateSpeed} min={0.0} max={5.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "fateSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("mirrors")} value={infiniteCorridor.mirrors} min={0.0} max={2.5} step={0.5} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "mirrors", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-mirrors" value={infiniteCorridor.mirrors} min={0.0} max={2.5} step={0.5} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "mirrors", v)} isRTL={isRTL} />

            {/* KALEIDOSCOPE SPEED: Hidden unless mirrors > 0 */}
            {infiniteCorridor.mirrors > 0 && (
              <>
                <ControlSlider label={t("kaleidoscopeSpeed")} value={infiniteCorridor.kaleidoscopeSpeed} min={0.0} max={5.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "kaleidoscopeSpeed", v)} isRTL={isRTL} />
                <CustomSlider id="infiniteCorridor-kaleidoscopeSpeed" value={infiniteCorridor.kaleidoscopeSpeed} min={0.0} max={5.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "kaleidoscopeSpeed", v)} isRTL={isRTL} />
              </>
            )}

            <ControlSlider label={t("noiseStrength")} value={infiniteCorridor.noiseStrength} min={0.0} max={2.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "noiseStrength", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-noiseStrength" value={infiniteCorridor.noiseStrength} min={0.0} max={2.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "noiseStrength", v)} isRTL={isRTL} />

            <ControlSlider label={t("distortionStrength")} value={infiniteCorridor.distortionStrength} min={0.0} max={2.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "distortionStrength", v)} isRTL={isRTL} />
            <CustomSlider id="infiniteCorridor-distortionStrength" value={infiniteCorridor.distortionStrength} min={0.0} max={2.0} step={0.01} onValueChange={(v) => updateShaderConfig("infiniteCorridor", "distortionStrength", v)} isRTL={isRTL} />

            {/* --- MATERIAL COLOR PICKERS --- */}
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("lightColor")}</span>
              <ColorPicker value={infiniteCorridor.lightColor} onValueChange={(c) => updateShaderConfig("infiniteCorridor", "lightColor", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>

            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("glowColor")}</span>
              <ColorPicker value={infiniteCorridor.glowColor} onValueChange={(c) => updateShaderConfig("infiniteCorridor", "glowColor", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>

            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("substrateColor")}</span>
              <ColorPicker value={infiniteCorridor.substrateColor} onValueChange={(c) => updateShaderConfig("infiniteCorridor", "substrateColor", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>

            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("backgroundColor")}</span>
              <ColorPicker value={infiniteCorridor.backgroundColor} onValueChange={(c) => updateShaderConfig("infiniteCorridor", "backgroundColor", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>

            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("filterColor")}</span>
              <ColorPicker value={infiniteCorridor.filterColor} onValueChange={(c) => updateShaderConfig("infiniteCorridor", "filterColor", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>
          </>
        )}
        {renderShaderControls(
          "spaceFlower",
          spaceFlower,
          <>
            <ControlSlider
              label={t("speed")}
              value={spaceFlower.speed}
              min={0}
              max={50}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "speed", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="spaceFlower-speed"
              value={spaceFlower.speed}
              min={0}
              max={6}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "speed", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("hue")}
              value={spaceFlower.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "hue", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="spaceFlower-hue"
              value={spaceFlower.hue}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "hue", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("saturation")}
              value={spaceFlower.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "saturation", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="spaceFlower-saturation"
              value={spaceFlower.saturation}
              min={0}
              max={2}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "saturation", v)}
              isRTL={isRTL}
            />

            <CustomCheckbox
              id="spaceFlower-symmetry"
              direction={isRTL ? "rtl" : "ltr"}
              checked={spaceFlower.symmetry === 1}
              onChange={(checked) =>
                updateShaderConfig("spaceFlower", "symmetry", checked ? 1 : 0)
              }
              label={t("symmetry")}
            />
            
            <ControlSlider
              label={t("bandCount")}
              value={spaceFlower.bandCount}
              min={1}
              max={64}
              step={1}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "bandCount", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="spaceFlower-bandCount"
              value={spaceFlower.bandCount}
              min={1}
              max={64}
              step={1}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "bandCount", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("twist")}
              value={spaceFlower.twist}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "twist", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="spaceFlower-twist"
              value={spaceFlower.twist}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "twist", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("center")}
              value={spaceFlower.center}
              min={0}
              max={3}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "center", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="spaceFlower-center"
              value={spaceFlower.center}
              min={0}
              max={3}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "center", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("proportion")}
              value={spaceFlower.proportion}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "proportion", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="spaceFlower-proportion"
              value={spaceFlower.proportion}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "proportion", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("softness")}
              value={spaceFlower.softness}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "softness", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="spaceFlower-softness"
              value={spaceFlower.softness}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "softness", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("noise")}
              value={spaceFlower.noise}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "noise", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="spaceFlower-noise"
              value={spaceFlower.noise}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "noise", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("noiseFrequency")}
              value={spaceFlower.noiseFrequency}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "noiseFrequency", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="spaceFlower-noiseFrequency"
              value={spaceFlower.noiseFrequency}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "noiseFrequency", v)}
              isRTL={isRTL}
            />

            <ControlSlider
              label={t("colorCount")}
              value={spaceFlower.colorCount}
              min={1}
              max={10}
              step={1}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "colorCount", v)}
              isRTL={isRTL}
            />
            <CustomSlider
              id="spaceFlower-colorCount"
              value={spaceFlower.colorCount}
              min={1}
              max={10}
              step={1}
              onValueChange={(v) => updateShaderConfig("spaceFlower", "colorCount", v)}
              isRTL={isRTL}
            />

            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("backgroundColor")}</span>
              <ColorPicker
                value={spaceFlower.colorBack}
                onValueChange={(c) => {
                  updateShaderConfig("spaceFlower", "colorBack", hsvaToHex(c));
                }}
                hideAlpha
                hideContrastRatio
              />
            </div>

            {spaceFlower.colors.slice(0, spaceFlower.colorCount).map((color, index) => (
              <div key={index} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">
                  {t("color")} {index + 1}
                </span>
                <ColorPicker
                  value={color}
                  onValueChange={(c) => {
                    const updatedColors = [...spaceFlower.colors];
                    updatedColors[index] = hsvaToHex(c);
                    updateShaderConfig("spaceFlower", "colors", updatedColors);
                  }}
                  hideAlpha
                  hideContrastRatio
                />
              </div>
            ))}
          </>
        )}
        {renderShaderControls(
          "electricSpiral",
          electricSpiral,
          <>
            {/* SPEED */}
            <ControlSlider label={t("speed")} value={electricSpiral.speed} min={0} max={5} step={0.01} onValueChange={(v) => updateShaderConfig("electricSpiral", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="electricSpiral-speed" value={electricSpiral.speed} min={0} max={5} step={0.01} onValueChange={(v) => updateShaderConfig("electricSpiral", "speed", v)} isRTL={isRTL} />

            {/* HUE */}
            <ControlSlider label={t("hue")} value={electricSpiral.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("electricSpiral", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="electricSpiral-hue" value={electricSpiral.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("electricSpiral", "hue", v)} isRTL={isRTL} />

            {/* SATURATION */}
            <ControlSlider label={t("saturation")} value={electricSpiral.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("electricSpiral", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="electricSpiral-saturation" value={electricSpiral.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("electricSpiral", "saturation", v)} isRTL={isRTL} />

            {/* GRID SCALE */}
            <ControlSlider label={t("gridScale")} value={electricSpiral.gridScale} min={1} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("electricSpiral", "gridScale", v)} isRTL={isRTL} />
            <CustomSlider id="electricSpiral-gridScale" value={electricSpiral.gridScale} min={1} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("electricSpiral", "gridScale", v)} isRTL={isRTL} />

            {/* GRID SOFTNESS */}
            <ControlSlider label={t("gridSoftness")} value={electricSpiral.gridSoftness} min={0} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("electricSpiral", "gridSoftness", v)} isRTL={isRTL} />
            <CustomSlider id="electricSpiral-gridSoftness" value={electricSpiral.gridSoftness} min={0} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("electricSpiral", "gridSoftness", v)} isRTL={isRTL} />

            {/* SPIRAL FREQUENCY */}
            <ControlSlider label={t("spiralFrequency")} value={electricSpiral.spiralFrequency} min={1} max={30} step={0.1} onValueChange={(v) => updateShaderConfig("electricSpiral", "spiralFrequency", v)} isRTL={isRTL} />
            <CustomSlider id="electricSpiral-spiralFrequency" value={electricSpiral.spiralFrequency} min={1} max={30} step={0.1} onValueChange={(v) => updateShaderConfig("electricSpiral", "spiralFrequency", v)} isRTL={isRTL} />

            {/* SPIRAL TIGHTNESS */}
            <ControlSlider label={t("spiralTightness")} value={electricSpiral.spiralTightness} min={1} max={25} step={0.1} onValueChange={(v) => updateShaderConfig("electricSpiral", "spiralTightness", v)} isRTL={isRTL} />
            <CustomSlider id="electricSpiral-spiralTightness" value={electricSpiral.spiralTightness} min={1} max={25} step={0.1} onValueChange={(v) => updateShaderConfig("electricSpiral", "spiralTightness", v)} isRTL={isRTL} />

            {/* GLOW INTENSITY */}
            <ControlSlider label={t("glowIntensity")} value={electricSpiral.glowIntensity} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("electricSpiral", "glowIntensity", v)} isRTL={isRTL} />
            <CustomSlider id="electricSpiral-glowIntensity" value={electricSpiral.glowIntensity} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("electricSpiral", "glowIntensity", v)} isRTL={isRTL} />

            {/* CORE BRIGHTNESS */}
            <ControlSlider label={t("coreBrightness")} value={electricSpiral.coreBrightness} min={-10} max={-0.5} step={0.05} onValueChange={(v) => updateShaderConfig("electricSpiral", "coreBrightness", v)} isRTL={isRTL} />
            <CustomSlider id="electricSpiral-coreBrightness" value={electricSpiral.coreBrightness} min={-10} max={-0.5} step={0.05} onValueChange={(v) => updateShaderConfig("electricSpiral", "coreBrightness", v)} isRTL={isRTL} />

            {/* COLOR PICKER: GRID BACKGROUND */}
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("gridColor")}</span>
              <ColorPicker
                value={electricSpiral.colorGrid}
                onValueChange={(c) => updateShaderConfig("electricSpiral", "colorGrid", hsvaToHex(c))}
                hideAlpha
                hideContrastRatio
              />
            </div>

            {/* COLOR PICKER: CORE GLOW */}
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("glowColor")}</span>
              <ColorPicker
                value={electricSpiral.colorGlow}
                onValueChange={(c) => updateShaderConfig("electricSpiral", "colorGlow", hsvaToHex(c))}
                hideAlpha
                hideContrastRatio
              />
            </div>

            {/* COLOR PICKER: ELECTRIC ARCS */}
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("spiralColor")}</span>
              <ColorPicker
                value={electricSpiral.colorSpiral}
                onValueChange={(c) => updateShaderConfig("electricSpiral", "colorSpiral", hsvaToHex(c))}
                hideAlpha
                hideContrastRatio
              />
            </div>
          </>
        )}
        {renderShaderControls(
          "twistedKaleidoscope",
          twistedKaleidoscope,
          <>
            {/* SPEED */}
            <ControlSlider label={t("speed")} value={twistedKaleidoscope.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="twistedKaleidoscope-speed" value={twistedKaleidoscope.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "speed", v)} isRTL={isRTL} />

            {/* HUE */}
            <ControlSlider label={t("hue")} value={twistedKaleidoscope.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="twistedKaleidoscope-hue" value={twistedKaleidoscope.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "hue", v)} isRTL={isRTL} />

            {/* SATURATION */}
            <ControlSlider label={t("saturation")} value={twistedKaleidoscope.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="twistedKaleidoscope-saturation" value={twistedKaleidoscope.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "saturation", v)} isRTL={isRTL} />

            {/* BAND COUNT */}
            <ControlSlider label={t("bandCount")} value={twistedKaleidoscope.bandCount} min={2} max={24} step={1} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "bandCount", v)} isRTL={isRTL} />
            <CustomSlider id="twistedKaleidoscope-bandCount" value={twistedKaleidoscope.bandCount} min={2} max={24} step={1} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "bandCount", v)} isRTL={isRTL} />

            {/* TWIST */}
            <ControlSlider label={t("twist")} value={twistedKaleidoscope.twist} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "twist", v)} isRTL={isRTL} />
            <CustomSlider id="twistedKaleidoscope-twist" value={twistedKaleidoscope.twist} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "twist", v)} isRTL={isRTL} />

            {/* CENTER */}
            <ControlSlider label={t("center")} value={twistedKaleidoscope.center} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "center", v)} isRTL={isRTL} />
            <CustomSlider id="twistedKaleidoscope-center" value={twistedKaleidoscope.center} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "center", v)} isRTL={isRTL} />

            {/* PROPORTION */}
            <ControlSlider label={t("proportion")} value={twistedKaleidoscope.proportion} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "proportion", v)} isRTL={isRTL} />
            <CustomSlider id="twistedKaleidoscope-proportion" value={twistedKaleidoscope.proportion} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "proportion", v)} isRTL={isRTL} />

            {/* SOFTNESS */}
            <ControlSlider label={t("softness")} value={twistedKaleidoscope.softness} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "softness", v)} isRTL={isRTL} />
            <CustomSlider id="twistedKaleidoscope-softness" value={twistedKaleidoscope.softness} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "softness", v)} isRTL={isRTL} />

            {/* NOISE */}
            <ControlSlider label={t("noise")} value={twistedKaleidoscope.noise} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "noise", v)} isRTL={isRTL} />
            <CustomSlider id="twistedKaleidoscope-noise" value={twistedKaleidoscope.noise} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "noise", v)} isRTL={isRTL} />

            {/* NOISE FREQUENCY */}
            <ControlSlider label={t("noiseFrequency")} value={twistedKaleidoscope.noiseFrequency} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "noiseFrequency", v)} isRTL={isRTL} />
            <CustomSlider id="twistedKaleidoscope-noiseFrequency" value={twistedKaleidoscope.noiseFrequency} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "noiseFrequency", v)} isRTL={isRTL} />

            {/* COLOR COUNT */}
            <ControlSlider label={t("colorCount")} value={twistedKaleidoscope.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "colorCount", v)} isRTL={isRTL} />
            <CustomSlider id="twistedKaleidoscope-colorCount" value={twistedKaleidoscope.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("twistedKaleidoscope", "colorCount", v)} isRTL={isRTL} />

            <CustomCheckbox
              id="twistedKaleidoscope-symmetry"
              direction={isRTL ? "rtl" : "ltr"}
              checked={twistedKaleidoscope.symmetry === 1}
              onChange={(checked) =>
                updateShaderConfig("twistedKaleidoscope", "symmetry", checked ? 1 : 0)
              }
              label={t("symmetry")}
            />

            {/* BACKGROUND COLOR PICKER */}
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">
                {t("backgroundColor")}
              </span>
              <ColorPicker value={twistedKaleidoscope.colorBack} onValueChange={(c) => {
                updateShaderConfig("twistedKaleidoscope", "colorBack", hsvaToHex(c));
              }} hideAlpha hideContrastRatio />
            </div>

            {/* DYNAMIC GRADIENT PICKERS */}
            {twistedKaleidoscope.colors.slice(0, twistedKaleidoscope.colorCount).map((color: string, index: number) => (
              <div key={index} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">
                  {t("color")} {index + 1}
                </span>
                <ColorPicker value={color} onValueChange={(c) => {
                  const updatedColors = [...twistedKaleidoscope.colors];
                  updatedColors[index] = hsvaToHex(c);
                  updateShaderConfig("twistedKaleidoscope", "colors", updatedColors);
                }} hideAlpha hideContrastRatio />
              </div>
            ))}
          </>
        )}

        {renderShaderControls("trickyShapes", trickyShapes, (
          <>
            {/* SHAPE MODE SELECTOR */}
            <ControlSlider label={t("shapeProfile")} value={trickyShapes.shapeMode} min={0} max={5} step={1} onValueChange={(v) => updateShaderConfig("trickyShapes", "shapeMode", v)} isRTL={isRTL} />
            <CustomSlider id="trickyShapes-shapeMode" value={trickyShapes.shapeMode} min={0} max={5} step={1} onValueChange={(v) => updateShaderConfig("trickyShapes", "shapeMode", v)} isRTL={isRTL} />

            {/* VIRTUAL RENDER RESOLUTION DOWNSCALE */}
            <ControlSlider label={t("renderScale")} value={trickyShapes.renderScale} min={0.1} max={1.0} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="trickyShapes-renderScale" value={trickyShapes.renderScale} min={0.1} max={1.0} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "renderScale", v)} isRTL={isRTL} />
              
            {/* SPEED */}
            <ControlSlider label={t("speed")} value={trickyShapes.speed} min={0} max={10} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="trickyShapes-speed" value={trickyShapes.speed} min={0} max={10} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "speed", v)} isRTL={isRTL} />

            {/* HUE */}
            <ControlSlider label={t("hue")} value={trickyShapes.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("trickyShapes", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="trickyShapes-hue" value={trickyShapes.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("trickyShapes", "hue", v)} isRTL={isRTL} />

            {/* SATURATION */}
            <ControlSlider label={t("saturation")} value={trickyShapes.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="trickyShapes-saturation" value={trickyShapes.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "saturation", v)} isRTL={isRTL} />

            {/* STACKED CHECKBOX CONTROLS */}
            <div className="flex flex-col space-y-4 mt-4">
              {/* Kaleidoscope Checkbox ALWAYS visible */}
              <CustomCheckbox id="trickyShapes-kaleidoscopeEnabled" direction={isRTL ? "rtl" : "ltr"} checked={trickyShapes.kaleidoscopeEnabled === 1} onChange={(checked) => updateShaderConfig("trickyShapes", "kaleidoscopeEnabled", checked ? 1 : 0)} label={t("kaleidoscope")} />
              
              {/* Symmetry Checkbox ONLY shown if Kaleidoscope is checked */}
              {trickyShapes.kaleidoscopeEnabled === 1 && (
                <CustomCheckbox id="trickyShapes-symmetry" direction={isRTL ? "rtl" : "ltr"} checked={trickyShapes.symmetry === 1} onChange={(checked) => updateShaderConfig("trickyShapes", "symmetry", checked ? 1 : 0)} label={t("symmetry")} />
              )}
            </div>

            {/* BAND COUNT - Shown for shapes 1-4, but for the 5th shape, only shown if Kaleidoscope is active */}
            {(trickyShapes.shapeMode < 4.5 || trickyShapes.kaleidoscopeEnabled === 1) && (
              <>
                <ControlSlider label={t("bandCount")} value={trickyShapes.bandCount} min={1} max={36} step={1} onValueChange={(v) => updateShaderConfig("trickyShapes", "bandCount", v)} isRTL={isRTL} />
                <CustomSlider id="trickyShapes-bandCount" value={trickyShapes.bandCount} min={1} max={36} step={1} onValueChange={(v) => updateShaderConfig("trickyShapes", "bandCount", v)} isRTL={isRTL} />
              </>
            )}

            {/* TWIST - Hidden for Raymarched Shape Mode 4 */}
            {!(trickyShapes.shapeMode >= 3.5 && trickyShapes.shapeMode < 4.5) && (
              <>
                <ControlSlider label={t("twist")} value={trickyShapes.twist} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "twist", v)} isRTL={isRTL} />
                <CustomSlider id="trickyShapes-twist" value={trickyShapes.twist} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "twist", v)} isRTL={isRTL} />
              </>
            )}

            {/* PROPORTION */}
            <ControlSlider label={t("proportion")} value={trickyShapes.proportion} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "proportion", v)} isRTL={isRTL} />
            <CustomSlider id="trickyShapes-proportion" value={trickyShapes.proportion} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "proportion", v)} isRTL={isRTL} />

            {/* SOFTNESS */}
            <ControlSlider label={t("softness")} value={trickyShapes.softness} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "softness", v)} isRTL={isRTL} />
            <CustomSlider id="trickyShapes-softness" value={trickyShapes.softness} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "softness", v)} isRTL={isRTL} />

            {/* NOISE */}
            <ControlSlider label={t("noise")} value={trickyShapes.noise} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "noise", v)} isRTL={isRTL} />
            <CustomSlider id="trickyShapes-noise" value={trickyShapes.noise} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "noise", v)} isRTL={isRTL} />

            {/* DISTORTION */}
            <ControlSlider label={t("distortion")} value={trickyShapes.distortion} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "distortion", v)} isRTL={isRTL} />
            <CustomSlider id="trickyShapes-distortion" value={trickyShapes.distortion} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "distortion", v)} isRTL={isRTL} />
            
            {/* COLOR COUNT */}
            <ControlSlider label={t("colorCount")} value={trickyShapes.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("trickyShapes", "colorCount", v)} isRTL={isRTL} />
            <CustomSlider id="trickyShapes-colorCount" value={trickyShapes.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("trickyShapes", "colorCount", v)} isRTL={isRTL} />

            {/* 3D RAYMARCH CONDITIONAL CONTROLS - Enabled ONLY for Mode 4 (3.5 <= mode < 4.5) */}
            {trickyShapes.shapeMode >= 3.5 && trickyShapes.shapeMode < 4.5 && (
              <>
                <ControlSlider label={t("rayShape")} value={trickyShapes.rayShape} min={0} max={2} step={1} onValueChange={(v) => updateShaderConfig("trickyShapes", "rayShape", v)} isRTL={isRTL} />
                <CustomSlider id="trickyShapes-rayShape" value={trickyShapes.rayShape} min={0} max={2} step={1} onValueChange={(v) => updateShaderConfig("trickyShapes", "rayShape", v)} isRTL={isRTL} />

                <ControlSlider label={t("raySpeed")} value={trickyShapes.raySpeed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "raySpeed", v)} isRTL={isRTL} />
                <CustomSlider id="trickyShapes-raySpeed" value={trickyShapes.raySpeed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "raySpeed", v)} isRTL={isRTL} />
              </>
            )}

            {/* DARKEN */}
            <ControlSlider label={t("darken")} value={trickyShapes.darken} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "darken", v)} isRTL={isRTL} />
            <CustomSlider id="trickyShapes-darken" value={trickyShapes.darken} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("trickyShapes", "darken", v)} isRTL={isRTL} />

            {/* BACKGROUND COLOR PICKER */}
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("backgroundColor")}</span>
              <ColorPicker value={trickyShapes.colorBack} onValueChange={(c) => updateShaderConfig("trickyShapes", "colorBack", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>

            {/* DYNAMIC GRADIENT PICKERS */}
            {trickyShapes.colors.slice(0, trickyShapes.colorCount).map((color: string, index: number) => (
              <div key={index} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">{t("color")} {index + 1}</span>
                <ColorPicker value={color} onValueChange={(c) => {
                  const updatedColors = [...trickyShapes.colors];
                  updatedColors[index] = hsvaToHex(c);
                  updateShaderConfig("trickyShapes", "colors", updatedColors);
                }} hideAlpha hideContrastRatio />
              </div>
            ))}
          </>
        ))}

        {renderShaderControls(
          "gridAttractor",
          gridAttractor,
          <>
            <ControlSlider label={t("speed")} value={gridAttractor.speed} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("gridAttractor", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="gridAttractor-speed" value={gridAttractor.speed} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("gridAttractor", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("cellSize")} value={gridAttractor.cellSize} min={0.03} max={0.3} step={0.005} onValueChange={(v) => updateShaderConfig("gridAttractor", "cellSize", v)} isRTL={isRTL} />
            <CustomSlider id="gridAttractor-cellSize" value={gridAttractor.cellSize} min={0.03} max={0.3} step={0.005} onValueChange={(v) => updateShaderConfig("gridAttractor", "cellSize", v)} isRTL={isRTL} />

            <ControlSlider label={t("sphereSize")} value={gridAttractor.sphereSize} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("gridAttractor", "sphereSize", v)} isRTL={isRTL} />
            <CustomSlider id="gridAttractor-sphereSize" value={gridAttractor.sphereSize} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("gridAttractor", "sphereSize", v)} isRTL={isRTL} />

            <ControlSlider label={t("boxHeight")} value={gridAttractor.boxHeight} min={0.02} max={0.3} step={0.005} onValueChange={(v) => updateShaderConfig("gridAttractor", "boxHeight", v)} isRTL={isRTL} />
            <CustomSlider id="gridAttractor-boxHeight" value={gridAttractor.boxHeight} min={0.02} max={0.3} step={0.005} onValueChange={(v) => updateShaderConfig("gridAttractor", "boxHeight", v)} isRTL={isRTL} />

            <ControlSlider label={t("pulseHeight")} value={gridAttractor.pulseHeight} min={0} max={0.2} step={0.005} onValueChange={(v) => updateShaderConfig("gridAttractor", "pulseHeight", v)} isRTL={isRTL} />
            <CustomSlider id="gridAttractor-pulseHeight" value={gridAttractor.pulseHeight} min={0} max={0.2} step={0.005} onValueChange={(v) => updateShaderConfig("gridAttractor", "pulseHeight", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={gridAttractor.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("gridAttractor", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="gridAttractor-hue" value={gridAttractor.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("gridAttractor", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={gridAttractor.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("gridAttractor", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="gridAttractor-saturation" value={gridAttractor.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("gridAttractor", "saturation", v)} isRTL={isRTL} />

            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("colorSphere")}</span>
              <ColorPicker value={gridAttractor.colorSphere} onValueChange={(c) => updateShaderConfig("gridAttractor", "colorSphere", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("colorTop")}</span>
              <ColorPicker value={gridAttractor.colorTop} onValueChange={(c) => updateShaderConfig("gridAttractor", "colorTop", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("colorSide")}</span>
              <ColorPicker value={gridAttractor.colorSide} onValueChange={(c) => updateShaderConfig("gridAttractor", "colorSide", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("colorFront")}</span>
              <ColorPicker value={gridAttractor.colorFront} onValueChange={(c) => updateShaderConfig("gridAttractor", "colorFront", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>
          </>
        )}

        {renderShaderControls(
          "tunnelCylinders",
          tunnelCylinders,
          <>
            <ControlSlider label={t("renderScale")} value={tunnelCylinders.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-renderScale" value={tunnelCylinders.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("tunnelMix")} value={tunnelCylinders.tunnelMix} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "tunnelMix", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-tunnelMix" value={tunnelCylinders.tunnelMix} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "tunnelMix", v)} isRTL={isRTL} />

            <ControlSlider label={t("swirlMix")} value={tunnelCylinders.swirlMix} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "swirlMix", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-swirlMix" value={tunnelCylinders.swirlMix} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "swirlMix", v)} isRTL={isRTL} />

            <ControlSlider label={t("spiralMix")} value={tunnelCylinders.spiralMix} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "spiralMix", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-spiralMix" value={tunnelCylinders.spiralMix} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "spiralMix", v)} isRTL={isRTL} />

            <ControlSlider label={t("speed")} value={tunnelCylinders.speed} min={0} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-speed" value={tunnelCylinders.speed} min={0} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("travelSpeed")} value={tunnelCylinders.travelSpeed} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "travelSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-travelSpeed" value={tunnelCylinders.travelSpeed} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "travelSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("tunnelRadius")} value={tunnelCylinders.tunnelRadius} min={0.3} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "tunnelRadius", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-tunnelRadius" value={tunnelCylinders.tunnelRadius} min={0.3} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "tunnelRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("segments")} value={tunnelCylinders.segments} min={5} max={150} step={1} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "segments", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-segments" value={tunnelCylinders.segments} min={5} max={150} step={1} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "segments", v)} isRTL={isRTL} />

            <ControlSlider label={t("ringFrequency")} value={tunnelCylinders.ringFrequency} min={0.5} max={8} step={0.1} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "ringFrequency", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-ringFrequency" value={tunnelCylinders.ringFrequency} min={0.5} max={8} step={0.1} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "ringFrequency", v)} isRTL={isRTL} />

            <ControlSlider label={t("cylinderThickness")} value={tunnelCylinders.cylinderThickness} min={0.005} max={0.1} step={0.001} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "cylinderThickness", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-cylinderThickness" value={tunnelCylinders.cylinderThickness} min={0.005} max={0.1} step={0.001} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "cylinderThickness", v)} isRTL={isRTL} />

            <ControlSlider label={t("thicknessVariation")} value={tunnelCylinders.thicknessVariation} min={0} max={0.5} step={0.01} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "thicknessVariation", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-thicknessVariation" value={tunnelCylinders.thicknessVariation} min={0} max={0.5} step={0.01} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "thicknessVariation", v)} isRTL={isRTL} />

            <ControlSlider label={t("glowIntensity")} value={tunnelCylinders.glowIntensity} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "glowIntensity", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-glowIntensity" value={tunnelCylinders.glowIntensity} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "glowIntensity", v)} isRTL={isRTL} />

            <ControlSlider label={t("bandCount")} value={tunnelCylinders.swirlBandCount} min={1} max={20} step={1} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "swirlBandCount", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-swirlBandCount" value={tunnelCylinders.swirlBandCount} min={1} max={20} step={1} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "swirlBandCount", v)} isRTL={isRTL} />

            <ControlSlider label={t("twist")} value={tunnelCylinders.swirlTwist} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "swirlTwist", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-swirlTwist" value={tunnelCylinders.swirlTwist} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "swirlTwist", v)} isRTL={isRTL} />

            <ControlSlider label={t("ribbonCount")} value={tunnelCylinders.spiralRibbonCount} min={10} max={100} step={10} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "spiralRibbonCount", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-spiralRibbonCount" value={tunnelCylinders.spiralRibbonCount} min={10} max={100} step={10} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "spiralRibbonCount", v)} isRTL={isRTL} />

            <ControlSlider label={t("spiralDensity")} value={tunnelCylinders.spiralDensity} min={0} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "spiralDensity", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-spiralDensity" value={tunnelCylinders.spiralDensity} min={0} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "spiralDensity", v)} isRTL={isRTL} />

            <ControlSlider label={t("distortion")} value={tunnelCylinders.spiralDistortion} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "spiralDistortion", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-spiralDistortion" value={tunnelCylinders.spiralDistortion} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "spiralDistortion", v)} isRTL={isRTL} />

            {/* noise: 0 = fully off */}
            <ControlSlider label={t("noise")} value={tunnelCylinders.noiseIntensity} min={0} max={1.5} step={0.01} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "noiseIntensity", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-noiseIntensity" value={tunnelCylinders.noiseIntensity} min={0} max={1.5} step={0.01} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "noiseIntensity", v)} isRTL={isRTL} />

            <ControlSlider label={t("noiseFrequency")} value={tunnelCylinders.noiseScale} min={0.1} max={5} step={0.1} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "noiseScale", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-noiseScale" value={tunnelCylinders.noiseScale} min={0.1} max={5} step={0.1} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "noiseScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("noiseSpeed")} value={tunnelCylinders.noiseSpeed} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "noiseSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-noiseSpeed" value={tunnelCylinders.noiseSpeed} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "noiseSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={tunnelCylinders.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-hue" value={tunnelCylinders.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={tunnelCylinders.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-saturation" value={tunnelCylinders.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "saturation", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorCount")} value={tunnelCylinders.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "colorCount", v)} isRTL={isRTL} />
            <CustomSlider id="tunnelCylinders-colorCount" value={tunnelCylinders.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("tunnelCylinders", "colorCount", v)} isRTL={isRTL} />

            {tunnelCylinders.colors.slice(0, tunnelCylinders.colorCount).map((color, index) => (
              <div key={index} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">{t("color")} {index + 1}</span>
                <ColorPicker value={color} onValueChange={(c) => {
                  const updatedColors = [...tunnelCylinders.colors];
                  updatedColors[index] = hsvaToHex(c);
                  updateShaderConfig("tunnelCylinders", "colors", updatedColors);
                }} hideAlpha hideContrastRatio />
              </div>
            ))}
          </>
        )}

        {renderShaderControls(
          "psychedelicFlowerTunnel",
          psychedelicFlowerTunnel,
          <>
            <ControlSlider label={t("renderScale")} value={psychedelicFlowerTunnel.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="psychedelicFlowerTunnel-renderScale" value={psychedelicFlowerTunnel.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("speed")} value={psychedelicFlowerTunnel.speed} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="psychedelicFlowerTunnel-speed" value={psychedelicFlowerTunnel.speed} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("travelSpeed")} value={psychedelicFlowerTunnel.travelSpeed} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "travelSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="psychedelicFlowerTunnel-travelSpeed" value={psychedelicFlowerTunnel.travelSpeed} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "travelSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("distance")} value={psychedelicFlowerTunnel.repeatSpacing} min={2} max={40} step={0.5} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "repeatSpacing", v)} isRTL={isRTL} />
            <CustomSlider id="psychedelicFlowerTunnel-repeatSpacing" value={psychedelicFlowerTunnel.repeatSpacing} min={2} max={40} step={0.5} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "repeatSpacing", v)} isRTL={isRTL} />

            <ControlSlider label={t("boxSize")} value={psychedelicFlowerTunnel.boxSize} min={0.05} max={0.6} step={0.005} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "boxSize", v)} isRTL={isRTL} />
            <CustomSlider id="psychedelicFlowerTunnel-boxSize" value={psychedelicFlowerTunnel.boxSize} min={0.05} max={0.6} step={0.005} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "boxSize", v)} isRTL={isRTL} />

            <ControlSlider label={t("borderThickness")} value={psychedelicFlowerTunnel.edgeThickness} min={0.005} max={0.2} step={0.005} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "edgeThickness", v)} isRTL={isRTL} />
            <CustomSlider id="psychedelicFlowerTunnel-edgeThickness" value={psychedelicFlowerTunnel.edgeThickness} min={0.005} max={0.2} step={0.005} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "edgeThickness", v)} isRTL={isRTL} />

            <ControlSlider label={t("fractalScale")} value={psychedelicFlowerTunnel.scaleFactor} min={0.3} max={0.98} step={0.01} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "scaleFactor", v)} isRTL={isRTL} />
            <CustomSlider id="psychedelicFlowerTunnel-scaleFactor" value={psychedelicFlowerTunnel.scaleFactor} min={0.3} max={0.98} step={0.01} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "scaleFactor", v)} isRTL={isRTL} />

            <ControlSlider label={t("iterations")} value={psychedelicFlowerTunnel.iterations} min={1} max={12} step={1} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "iterations", v)} isRTL={isRTL} />
            <CustomSlider id="psychedelicFlowerTunnel-iterations" value={psychedelicFlowerTunnel.iterations} min={1} max={12} step={1} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "iterations", v)} isRTL={isRTL} />

            <ControlSlider label={t("sectors")} value={psychedelicFlowerTunnel.petalCount} min={2} max={30} step={1} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "petalCount", v)} isRTL={isRTL} />
            <CustomSlider id="psychedelicFlowerTunnel-petalCount" value={psychedelicFlowerTunnel.petalCount} min={2} max={30} step={1} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "petalCount", v)} isRTL={isRTL} />

            <ControlSlider label={t("rotationSpeed")} value={psychedelicFlowerTunnel.rotationSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "rotationSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="psychedelicFlowerTunnel-rotationSpeed" value={psychedelicFlowerTunnel.rotationSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "rotationSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("fieldOfView")} value={psychedelicFlowerTunnel.fov} min={0.2} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "fov", v)} isRTL={isRTL} />
            <CustomSlider id="psychedelicFlowerTunnel-fov" value={psychedelicFlowerTunnel.fov} min={0.2} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "fov", v)} isRTL={isRTL} />

            <ControlSlider label={t("fogDensity")} value={psychedelicFlowerTunnel.fogDensity} min={0} max={0.3} step={0.001} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "fogDensity", v)} isRTL={isRTL} />
            <CustomSlider id="psychedelicFlowerTunnel-fogDensity" value={psychedelicFlowerTunnel.fogDensity} min={0} max={0.3} step={0.001} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "fogDensity", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorShiftSpeed")} value={psychedelicFlowerTunnel.colorShiftSpeed} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "colorShiftSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="psychedelicFlowerTunnel-colorShiftSpeed" value={psychedelicFlowerTunnel.colorShiftSpeed} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "colorShiftSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={psychedelicFlowerTunnel.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="psychedelicFlowerTunnel-hue" value={psychedelicFlowerTunnel.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={psychedelicFlowerTunnel.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="psychedelicFlowerTunnel-saturation" value={psychedelicFlowerTunnel.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "saturation", v)} isRTL={isRTL} />

            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("backgroundColor")}</span>
              <ColorPicker value={psychedelicFlowerTunnel.colorBack} onValueChange={(c) => updateShaderConfig("psychedelicFlowerTunnel", "colorBack", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>

            <ControlSlider label={t("colorCount")} value={psychedelicFlowerTunnel.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "colorCount", v)} isRTL={isRTL} />
            <CustomSlider id="psychedelicFlowerTunnel-colorCount" value={psychedelicFlowerTunnel.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("psychedelicFlowerTunnel", "colorCount", v)} isRTL={isRTL} />

            {psychedelicFlowerTunnel.colors.slice(0, psychedelicFlowerTunnel.colorCount).map((color, index) => (
              <div key={index} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">{t("color")} {index + 1}</span>
                <ColorPicker value={color} onValueChange={(c) => {
                  const updatedColors = [...psychedelicFlowerTunnel.colors];
                  updatedColors[index] = hsvaToHex(c);
                  updateShaderConfig("psychedelicFlowerTunnel", "colors", updatedColors);
                }} hideAlpha hideContrastRatio />
              </div>
            ))}
          </>
        )}

        {renderShaderControls(
          "celestialJourney",
          celestialJourney,
          <>
            <ControlSlider label={t("renderScale")} value={celestialJourney.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="celestialJourney-renderScale" value={celestialJourney.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraSpeed")} value={celestialJourney.cameraSpeed} min={0} max={4} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "cameraSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="celestialJourney-cameraSpeed" value={celestialJourney.cameraSpeed} min={0} max={4} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "cameraSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("focalLength")} value={celestialJourney.focalLength} min={0.6} max={2.5} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "focalLength", v)} isRTL={isRTL} />
            <CustomSlider id="celestialJourney-focalLength" value={celestialJourney.focalLength} min={0.6} max={2.5} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "focalLength", v)} isRTL={isRTL} />

            <ControlSlider label={t("distance")} value={celestialJourney.maxDistance} min={8} max={35} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "maxDistance", v)} isRTL={isRTL} />
            <CustomSlider id="celestialJourney-maxDistance" value={celestialJourney.maxDistance} min={8} max={35} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "maxDistance", v)} isRTL={isRTL} />

            <ControlSlider label={t("tunnelRadius")} value={celestialJourney.tunnelRadius} min={0.3} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "tunnelRadius", v)} isRTL={isRTL} />
            <CustomSlider id="celestialJourney-tunnelRadius" value={celestialJourney.tunnelRadius} min={0.3} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "tunnelRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("tunnelRoughness")} value={celestialJourney.tunnelRoughness} min={0} max={4} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "tunnelRoughness", v)} isRTL={isRTL} />
            <CustomSlider id="celestialJourney-tunnelRoughness" value={celestialJourney.tunnelRoughness} min={0} max={4} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "tunnelRoughness", v)} isRTL={isRTL} />

            <ControlSlider label={t("density")} value={celestialJourney.volumeDensity} min={0.1} max={5} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "volumeDensity", v)} isRTL={isRTL} />
            <CustomSlider id="celestialJourney-volumeDensity" value={celestialJourney.volumeDensity} min={0.1} max={5} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "volumeDensity", v)} isRTL={isRTL} />

            <ControlSlider label={t("glowStrength")} value={celestialJourney.glowStrength} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "glowStrength", v)} isRTL={isRTL} />
            <CustomSlider id="celestialJourney-glowStrength" value={celestialJourney.glowStrength} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "glowStrength", v)} isRTL={isRTL} />

            <ControlSlider label={t("exposure")} value={celestialJourney.exposure} min={0.1} max={8} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "exposure", v)} isRTL={isRTL} />
            <CustomSlider id="celestialJourney-exposure" value={celestialJourney.exposure} min={0.1} max={8} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "exposure", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={celestialJourney.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("celestialJourney", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="celestialJourney-hue" value={celestialJourney.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("celestialJourney", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={celestialJourney.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="celestialJourney-saturation" value={celestialJourney.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("celestialJourney", "saturation", v)} isRTL={isRTL} />

            {[
              celestialJourney.color1,
              celestialJourney.color2,
              celestialJourney.color3,
              celestialJourney.color4,
              celestialJourney.color5,
              celestialJourney.color6,
              celestialJourney.color7,
            ].map((color, index) => {
              const colorKeys = [
                "color1",
                "color2",
                "color3",
                "color4",
                "color5",
                "color6",
                "color7",
              ] as const;
              
              return (
                <div key={index} className="flex flex-col gap-1 my-2">
                  <span className="text-sm font-medium">{t("color")} {index + 1}</span>
                  <ColorPicker 
                    value={color} 
                    onValueChange={(c) => updateShaderConfig("celestialJourney", colorKeys[index], hsvaToHex(c))} 
                    hideAlpha 
                    hideContrastRatio 
                  />
                </div>
              );
            })}
          </>
        )}

        {renderShaderControls(
          "discoHive",
          discoHive,
          <>
            <ControlSlider label={t("speed")} value={discoHive.speed} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("discoHive", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="discoHive-speed" value={discoHive.speed} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("discoHive", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("renderScale")} value={discoHive.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoHive", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="discoHive-renderScale" value={discoHive.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoHive", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorFlowSpeed")} value={discoHive.colorFlowSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("discoHive", "colorFlowSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="discoHive-colorFlowSpeed" value={discoHive.colorFlowSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("discoHive", "colorFlowSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraSpeed")} value={discoHive.camSpeed} min={0} max={12} step={0.1} onValueChange={(v) => updateShaderConfig("discoHive", "camSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="discoHive-camSpeed" value={discoHive.camSpeed} min={0} max={12} step={0.1} onValueChange={(v) => updateShaderConfig("discoHive", "camSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("fieldOfView")} value={discoHive.fov} min={0.4} max={2.5} step={0.01} onValueChange={(v) => updateShaderConfig("discoHive", "fov", v)} isRTL={isRTL} />
            <CustomSlider id="discoHive-fov" value={discoHive.fov} min={0.4} max={2.5} step={0.01} onValueChange={(v) => updateShaderConfig("discoHive", "fov", v)} isRTL={isRTL} />

            <ControlSlider label={t("rollAmount")} value={discoHive.rollAmount} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoHive", "rollAmount", v)} isRTL={isRTL} />
            <CustomSlider id="discoHive-rollAmount" value={discoHive.rollAmount} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoHive", "rollAmount", v)} isRTL={isRTL} />

            <ControlSlider label={t("rollSpeed")} value={discoHive.rollSpeed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("discoHive", "rollSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="discoHive-rollSpeed" value={discoHive.rollSpeed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("discoHive", "rollSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathAmpX")} value={discoHive.pathAmpX} min={0} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("discoHive", "pathAmpX", v)} isRTL={isRTL} />
            <CustomSlider id="discoHive-pathAmpX" value={discoHive.pathAmpX} min={0} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("discoHive", "pathAmpX", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathFreqX")} value={discoHive.pathFreqX} min={0} max={1} step={0.005} onValueChange={(v) => updateShaderConfig("discoHive", "pathFreqX", v)} isRTL={isRTL} />
            <CustomSlider id="discoHive-pathFreqX" value={discoHive.pathFreqX} min={0} max={1} step={0.005} onValueChange={(v) => updateShaderConfig("discoHive", "pathFreqX", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathAmpY")} value={discoHive.pathAmpY} min={0} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("discoHive", "pathAmpY", v)} isRTL={isRTL} />
            <CustomSlider id="discoHive-pathAmpY" value={discoHive.pathAmpY} min={0} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("discoHive", "pathAmpY", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathFreqY")} value={discoHive.pathFreqY} min={0} max={1} step={0.005} onValueChange={(v) => updateShaderConfig("discoHive", "pathFreqY", v)} isRTL={isRTL} />
            <CustomSlider id="discoHive-pathFreqY" value={discoHive.pathFreqY} min={0} max={1} step={0.005} onValueChange={(v) => updateShaderConfig("discoHive", "pathFreqY", v)} isRTL={isRTL} />

            <ControlSlider label={t("tunnelRadius")} value={discoHive.tunnelRadius} min={0.5} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("discoHive", "tunnelRadius", v)} isRTL={isRTL} />
            <CustomSlider id="discoHive-tunnelRadius" value={discoHive.tunnelRadius} min={0.5} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("discoHive", "tunnelRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("hexesAround")} value={discoHive.hexesAround} min={4} max={40} step={2} onValueChange={(v) => updateShaderConfig("discoHive", "hexesAround", v)} isRTL={isRTL} />
            <CustomSlider id="discoHive-hexesAround" value={discoHive.hexesAround} min={4} max={40} step={2} onValueChange={(v) => updateShaderConfig("discoHive", "hexesAround", v)} isRTL={isRTL} />

            <ControlSlider label={t("hexBorder")} value={discoHive.hexBorder} min={0.1} max={0.7} step={0.005} onValueChange={(v) => updateShaderConfig("discoHive", "hexBorder", v)} isRTL={isRTL} />
            <CustomSlider id="discoHive-hexBorder" value={discoHive.hexBorder} min={0.1} max={0.7} step={0.005} onValueChange={(v) => updateShaderConfig("discoHive", "hexBorder", v)} isRTL={isRTL} />

            <ControlSlider label={t("hexDotSize")} value={discoHive.hexDotSize} min={0} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("discoHive", "hexDotSize", v)} isRTL={isRTL} />
            <CustomSlider id="discoHive-hexDotSize" value={discoHive.hexDotSize} min={0} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("discoHive", "hexDotSize", v)} isRTL={isRTL} />

            <ControlSlider label={t("fogDensity")} value={discoHive.fogDensity} min={0} max={0.05} step={0.0005} onValueChange={(v) => updateShaderConfig("discoHive", "fogDensity", v)} isRTL={isRTL} />
            <CustomSlider id="discoHive-fogDensity" value={discoHive.fogDensity} min={0} max={0.05} step={0.0005} onValueChange={(v) => updateShaderConfig("discoHive", "fogDensity", v)} isRTL={isRTL} />

            <ControlSlider label={t("vignette")} value={discoHive.vignetteStrength} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("discoHive", "vignetteStrength", v)} isRTL={isRTL} />
            <CustomSlider id="discoHive-vignetteStrength" value={discoHive.vignetteStrength} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("discoHive", "vignetteStrength", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={discoHive.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("discoHive", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="discoHive-hue" value={discoHive.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("discoHive", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={discoHive.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("discoHive", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="discoHive-saturation" value={discoHive.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("discoHive", "saturation", v)} isRTL={isRTL} />

            {/* Number of colors hardcoded to 4 (no slice) */}
            {[0, 1, 2, 3].map((index) => {
              const color = discoHive.colors[index] || "#000000";
              return (
                <div key={index} className="flex flex-col gap-1 my-2">
                  <span className="text-sm font-medium">{t("color")} {index + 1}</span>
                  <ColorPicker value={color} onValueChange={(c) => {
                    const updatedColors = [...discoHive.colors];
                    updatedColors[index] = hsvaToHex(c);
                    updateShaderConfig("discoHive", "colors", updatedColors);
                  }} hideAlpha hideContrastRatio />
                </div>
              );
            })}
          </>
        )}

        {renderShaderControls(
          "discoHexnel",
          discoHexnel,
          <>
            <ControlSlider label={t("speed")} value={discoHexnel.speed} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("discoHexnel", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-speed" value={discoHexnel.speed} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("discoHexnel", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("renderScale")} value={discoHexnel.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoHexnel", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-renderScale" value={discoHexnel.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoHexnel", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraSpeed")} value={discoHexnel.cameraSpeed} min={0} max={12} step={0.1} onValueChange={(v) => updateShaderConfig("discoHexnel", "cameraSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-cameraSpeed" value={discoHexnel.cameraSpeed} min={0} max={12} step={0.1} onValueChange={(v) => updateShaderConfig("discoHexnel", "cameraSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("fieldOfView")} value={discoHexnel.fov} min={0.4} max={2.5} step={0.01} onValueChange={(v) => updateShaderConfig("discoHexnel", "fov", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-fov" value={discoHexnel.fov} min={0.4} max={2.5} step={0.01} onValueChange={(v) => updateShaderConfig("discoHexnel", "fov", v)} isRTL={isRTL} />

            <ControlSlider label={t("distance")} value={discoHexnel.maxDistance} min={20} max={150} step={1} onValueChange={(v) => updateShaderConfig("discoHexnel", "maxDistance", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-maxDistance" value={discoHexnel.maxDistance} min={20} max={150} step={1} onValueChange={(v) => updateShaderConfig("discoHexnel", "maxDistance", v)} isRTL={isRTL} />

            <ControlSlider label={t("precision")} value={discoHexnel.maxSteps} min={40} max={220} step={1} onValueChange={(v) => updateShaderConfig("discoHexnel", "maxSteps", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-maxSteps" value={discoHexnel.maxSteps} min={40} max={220} step={1} onValueChange={(v) => updateShaderConfig("discoHexnel", "maxSteps", v)} isRTL={isRTL} />

            <ControlSlider label={t("tunnelRadius")} value={discoHexnel.tunnelRadius} min={2} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("discoHexnel", "tunnelRadius", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-tunnelRadius" value={discoHexnel.tunnelRadius} min={2} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("discoHexnel", "tunnelRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("tunnelPulseAmount")} value={discoHexnel.tunnelPulseAmount} min={0} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("discoHexnel", "tunnelPulseAmount", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-tunnelPulseAmount" value={discoHexnel.tunnelPulseAmount} min={0} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("discoHexnel", "tunnelPulseAmount", v)} isRTL={isRTL} />

            <ControlSlider label={t("tunnelPulseSpeed")} value={discoHexnel.tunnelPulseSpeed} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("discoHexnel", "tunnelPulseSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-tunnelPulseSpeed" value={discoHexnel.tunnelPulseSpeed} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("discoHexnel", "tunnelPulseSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("hexWrapCount")} value={discoHexnel.hexWrapCount} min={6} max={60} step={1} onValueChange={(v) => updateShaderConfig("discoHexnel", "hexWrapCount", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-hexWrapCount" value={discoHexnel.hexWrapCount} min={6} max={60} step={1} onValueChange={(v) => updateShaderConfig("discoHexnel", "hexWrapCount", v)} isRTL={isRTL} />

            <ControlSlider label={t("hexBevelAmount")} value={discoHexnel.hexBevelAmount} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoHexnel", "hexBevelAmount", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-hexBevelAmount" value={discoHexnel.hexBevelAmount} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoHexnel", "hexBevelAmount", v)} isRTL={isRTL} />

            <ControlSlider label={t("rayCount")} value={discoHexnel.rayCount} min={2} max={40} step={1} onValueChange={(v) => updateShaderConfig("discoHexnel", "rayCount", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-rayCount" value={discoHexnel.rayCount} min={2} max={40} step={1} onValueChange={(v) => updateShaderConfig("discoHexnel", "rayCount", v)} isRTL={isRTL} />

            <ControlSlider label={t("raySpeed")} value={discoHexnel.raySpinSpeed} min={0} max={10} step={0.05} onValueChange={(v) => updateShaderConfig("discoHexnel", "raySpinSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-raySpinSpeed" value={discoHexnel.raySpinSpeed} min={0} max={10} step={0.05} onValueChange={(v) => updateShaderConfig("discoHexnel", "raySpinSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("strobeSpeed")} value={discoHexnel.strobeSpeed} min={0} max={30} step={0.1} onValueChange={(v) => updateShaderConfig("discoHexnel", "strobeSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-strobeSpeed" value={discoHexnel.strobeSpeed} min={0} max={30} step={0.1} onValueChange={(v) => updateShaderConfig("discoHexnel", "strobeSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("centerGlowSize")} value={discoHexnel.centerGlowSize} min={0.05} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoHexnel", "centerGlowSize", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-centerGlowSize" value={discoHexnel.centerGlowSize} min={0.05} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoHexnel", "centerGlowSize", v)} isRTL={isRTL} />

            <ControlSlider label={t("fogDensity")} value={discoHexnel.fogDensity} min={0} max={0.001} step={0.00001} onValueChange={(v) => updateShaderConfig("discoHexnel", "fogDensity", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-fogDensity" value={discoHexnel.fogDensity} min={0} max={0.001} step={0.00001} onValueChange={(v) => updateShaderConfig("discoHexnel", "fogDensity", v)} isRTL={isRTL} />

            <ControlSlider label={t("whirlpoolScale")} value={discoHexnel.whirlpoolScale} min={2} max={30} step={0.1} onValueChange={(v) => updateShaderConfig("discoHexnel", "whirlpoolScale", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-whirlpoolScale" value={discoHexnel.whirlpoolScale} min={2} max={30} step={0.1} onValueChange={(v) => updateShaderConfig("discoHexnel", "whirlpoolScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("whirlpoolArms")} value={discoHexnel.whirlpoolArms} min={1} max={30} step={0.5} onValueChange={(v) => updateShaderConfig("discoHexnel", "whirlpoolArms", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-whirlpoolArms" value={discoHexnel.whirlpoolArms} min={1} max={30} step={0.5} onValueChange={(v) => updateShaderConfig("discoHexnel", "whirlpoolArms", v)} isRTL={isRTL} />

            <ControlSlider label={t("whirlpoolRings")} value={discoHexnel.whirlpoolRings} min={-20} max={20} step={0.5} onValueChange={(v) => updateShaderConfig("discoHexnel", "whirlpoolRings", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-whirlpoolRings" value={discoHexnel.whirlpoolRings} min={-20} max={20} step={0.5} onValueChange={(v) => updateShaderConfig("discoHexnel", "whirlpoolRings", v)} isRTL={isRTL} />

            <ControlSlider label={t("whirlpoolTwistX")} value={discoHexnel.whirlpoolTwistX} min={-15} max={15} step={0.1} onValueChange={(v) => updateShaderConfig("discoHexnel", "whirlpoolTwistX", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-whirlpoolTwistX" value={discoHexnel.whirlpoolTwistX} min={-15} max={15} step={0.1} onValueChange={(v) => updateShaderConfig("discoHexnel", "whirlpoolTwistX", v)} isRTL={isRTL} />

            <ControlSlider label={t("whirlpoolTwistY")} value={discoHexnel.whirlpoolTwistY} min={-15} max={15} step={0.1} onValueChange={(v) => updateShaderConfig("discoHexnel", "whirlpoolTwistY", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-whirlpoolTwistY" value={discoHexnel.whirlpoolTwistY} min={-15} max={15} step={0.1} onValueChange={(v) => updateShaderConfig("discoHexnel", "whirlpoolTwistY", v)} isRTL={isRTL} />

            <ControlSlider label={t("whirlpoolFlowSpeedX")} value={discoHexnel.whirlpoolFlowSpeedX} min={-2} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("discoHexnel", "whirlpoolFlowSpeedX", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-whirlpoolFlowSpeedX" value={discoHexnel.whirlpoolFlowSpeedX} min={-2} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("discoHexnel", "whirlpoolFlowSpeedX", v)} isRTL={isRTL} />

            <ControlSlider label={t("whirlpoolFlowSpeedY")} value={discoHexnel.whirlpoolFlowSpeedY} min={-2} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("discoHexnel", "whirlpoolFlowSpeedY", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-whirlpoolFlowSpeedY" value={discoHexnel.whirlpoolFlowSpeedY} min={-2} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("discoHexnel", "whirlpoolFlowSpeedY", v)} isRTL={isRTL} />

            <ControlSlider label={t("liquidSwirlSpeed")} value={discoHexnel.liquidSwirlSpeed} min={0} max={8} step={0.05} onValueChange={(v) => updateShaderConfig("discoHexnel", "liquidSwirlSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-liquidSwirlSpeed" value={discoHexnel.liquidSwirlSpeed} min={0} max={8} step={0.05} onValueChange={(v) => updateShaderConfig("discoHexnel", "liquidSwirlSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("liquidRotSpeed")} value={discoHexnel.liquidRotSpeed} min={0} max={4} step={0.02} onValueChange={(v) => updateShaderConfig("discoHexnel", "liquidRotSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-liquidRotSpeed" value={discoHexnel.liquidRotSpeed} min={0} max={4} step={0.02} onValueChange={(v) => updateShaderConfig("discoHexnel", "liquidRotSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("detail")} value={discoHexnel.liquidDetail} min={2} max={16} step={1} onValueChange={(v) => updateShaderConfig("discoHexnel", "liquidDetail", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-liquidDetail" value={discoHexnel.liquidDetail} min={2} max={16} step={1} onValueChange={(v) => updateShaderConfig("discoHexnel", "liquidDetail", v)} isRTL={isRTL} />

            <ControlSlider label={t("liquidGlowRadius")} value={discoHexnel.liquidGlowRadius} min={2} max={40} step={0.5} onValueChange={(v) => updateShaderConfig("discoHexnel", "liquidGlowRadius", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-liquidGlowRadius" value={discoHexnel.liquidGlowRadius} min={2} max={40} step={0.5} onValueChange={(v) => updateShaderConfig("discoHexnel", "liquidGlowRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("liquidGlowPulseAmount")} value={discoHexnel.liquidGlowPulseAmount} min={0} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("discoHexnel", "liquidGlowPulseAmount", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-liquidGlowPulseAmount" value={discoHexnel.liquidGlowPulseAmount} min={0} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("discoHexnel", "liquidGlowPulseAmount", v)} isRTL={isRTL} />

            <ControlSlider label={t("pulseAFrequency")} value={discoHexnel.pulseAFrequency} min={0} max={10} step={0.05} onValueChange={(v) => updateShaderConfig("discoHexnel", "pulseAFrequency", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-pulseAFrequency" value={discoHexnel.pulseAFrequency} min={0} max={10} step={0.05} onValueChange={(v) => updateShaderConfig("discoHexnel", "pulseAFrequency", v)} isRTL={isRTL} />

            <ControlSlider label={t("pulseBFrequency")} value={discoHexnel.pulseBFrequency} min={0} max={10} step={0.05} onValueChange={(v) => updateShaderConfig("discoHexnel", "pulseBFrequency", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-pulseBFrequency" value={discoHexnel.pulseBFrequency} min={0} max={10} step={0.05} onValueChange={(v) => updateShaderConfig("discoHexnel", "pulseBFrequency", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={discoHexnel.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("discoHexnel", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-hue" value={discoHexnel.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("discoHexnel", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={discoHexnel.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("discoHexnel", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-saturation" value={discoHexnel.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("discoHexnel", "saturation", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorCount")} value={discoHexnel.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("discoHexnel", "colorCount", v)} isRTL={isRTL} />
            <CustomSlider id="discoHexnel-colorCount" value={discoHexnel.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("discoHexnel", "colorCount", v)} isRTL={isRTL} />

            {discoHexnel.colors.slice(0, discoHexnel.colorCount).map((color, index) => (
              <div key={index} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">{t("color")} {index + 1}</span>
                <ColorPicker value={color} onValueChange={(c) => {
                  const updatedColors = [...discoHexnel.colors];
                  updatedColors[index] = hsvaToHex(c);
                  updateShaderConfig("discoHexnel", "colors", updatedColors);
                }} hideAlpha hideContrastRatio />
              </div>
            ))}
          </>
        )}

        {renderShaderControls(
          "kaleidoscopeWheels",
          kaleidoscopeWheels,
          <>
            <ControlSlider label={t("speed")} value={kaleidoscopeWheels.speed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-speed" value={kaleidoscopeWheels.speed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("renderScale")} value={kaleidoscopeWheels.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-renderScale" value={kaleidoscopeWheels.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathAmplitude")} value={kaleidoscopeWheels.pathAmplitude} min={0} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "pathAmplitude", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-pathAmplitude" value={kaleidoscopeWheels.pathAmplitude} min={0} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "pathAmplitude", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathTwistFrequency")} value={kaleidoscopeWheels.pathTwistFrequency} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "pathTwistFrequency", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-pathTwistFrequency" value={kaleidoscopeWheels.pathTwistFrequency} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "pathTwistFrequency", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathSecondaryFrequency")} value={kaleidoscopeWheels.pathSecondaryFrequency} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "pathSecondaryFrequency", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-pathSecondaryFrequency" value={kaleidoscopeWheels.pathSecondaryFrequency} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "pathSecondaryFrequency", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathTertiaryFrequency")} value={kaleidoscopeWheels.pathTertiaryFrequency} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "pathTertiaryFrequency", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-pathTertiaryFrequency" value={kaleidoscopeWheels.pathTertiaryFrequency} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "pathTertiaryFrequency", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathQuaternaryFrequency")} value={kaleidoscopeWheels.pathQuaternaryFrequency} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "pathQuaternaryFrequency", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-pathQuaternaryFrequency" value={kaleidoscopeWheels.pathQuaternaryFrequency} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "pathQuaternaryFrequency", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathDriftSpeed")} value={kaleidoscopeWheels.pathDriftSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "pathDriftSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-pathDriftSpeed" value={kaleidoscopeWheels.pathDriftSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "pathDriftSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("segmentsMin")} value={kaleidoscopeWheels.segmentsMin} min={2} max={20} step={1} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "segmentsMin", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-segmentsMin" value={kaleidoscopeWheels.segmentsMin} min={2} max={20} step={1} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "segmentsMin", v)} isRTL={isRTL} />

            <ControlSlider label={t("segmentsMax")} value={kaleidoscopeWheels.segmentsMax} min={2} max={30} step={1} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "segmentsMax", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-segmentsMax" value={kaleidoscopeWheels.segmentsMax} min={2} max={30} step={1} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "segmentsMax", v)} isRTL={isRTL} />

            <ControlSlider label={t("kaleidoscopeSpeed")} value={kaleidoscopeWheels.segmentsSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "segmentsSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-segmentsSpeed" value={kaleidoscopeWheels.segmentsSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "segmentsSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("softness")} value={kaleidoscopeWheels.kaleidoscopeSoftness} min={0.1} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "kaleidoscopeSoftness", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-kaleidoscopeSoftness" value={kaleidoscopeWheels.kaleidoscopeSoftness} min={0.1} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "kaleidoscopeSoftness", v)} isRTL={isRTL} />

            <ControlSlider label={t("planeRotationSpeed")} value={kaleidoscopeWheels.planeRotationSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "planeRotationSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-planeRotationSpeed" value={kaleidoscopeWheels.planeRotationSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "planeRotationSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("planeRotationAmplitude")} value={kaleidoscopeWheels.planeRotationAmplitude} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "planeRotationAmplitude", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-planeRotationAmplitude" value={kaleidoscopeWheels.planeRotationAmplitude} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "planeRotationAmplitude", v)} isRTL={isRTL} />

            <ControlSlider label={t("spinSpeed")} value={kaleidoscopeWheels.internalSpinSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "internalSpinSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-internalSpinSpeed" value={kaleidoscopeWheels.internalSpinSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "internalSpinSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("zoomMin")} value={kaleidoscopeWheels.zoomMin} min={0.05} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "zoomMin", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-zoomMin" value={kaleidoscopeWheels.zoomMin} min={0.05} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "zoomMin", v)} isRTL={isRTL} />

            <ControlSlider label={t("zoomMax")} value={kaleidoscopeWheels.zoomMax} min={0.05} max={1.5} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "zoomMax", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-zoomMax" value={kaleidoscopeWheels.zoomMax} min={0.05} max={1.5} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "zoomMax", v)} isRTL={isRTL} />

            <ControlSlider label={t("truchetRadiusMin")} value={kaleidoscopeWheels.truchetRadiusMin} min={0.05} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "truchetRadiusMin", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-truchetRadiusMin" value={kaleidoscopeWheels.truchetRadiusMin} min={0.05} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "truchetRadiusMin", v)} isRTL={isRTL} />

            <ControlSlider label={t("truchetRadiusMax")} value={kaleidoscopeWheels.truchetRadiusMax} min={0.05} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "truchetRadiusMax", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-truchetRadiusMax" value={kaleidoscopeWheels.truchetRadiusMax} min={0.05} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "truchetRadiusMax", v)} isRTL={isRTL} />

            <ControlSlider label={t("truchetRadiusFrequency")} value={kaleidoscopeWheels.truchetRadiusFrequency} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "truchetRadiusFrequency", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-truchetRadiusFrequency" value={kaleidoscopeWheels.truchetRadiusFrequency} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "truchetRadiusFrequency", v)} isRTL={isRTL} />

            <ControlSlider label={t("lineWidth")} value={kaleidoscopeWheels.lineWidth} min={0.005} max={0.1} step={0.001} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "lineWidth", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-lineWidth" value={kaleidoscopeWheels.lineWidth} min={0.005} max={0.1} step={0.001} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "lineWidth", v)} isRTL={isRTL} />

            <ControlSlider label={t("planeSpacing")} value={kaleidoscopeWheels.planeSpacing} min={0.2} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "planeSpacing", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-planeSpacing" value={kaleidoscopeWheels.planeSpacing} min={0.2} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "planeSpacing", v)} isRTL={isRTL} />

            <ControlSlider label={t("planeCount")} value={kaleidoscopeWheels.planeCount} min={2} max={14} step={1} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "planeCount", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-planeCount" value={kaleidoscopeWheels.planeCount} min={2} max={14} step={1} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "planeCount", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorDistanceScale")} value={kaleidoscopeWheels.colorDistanceScale} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "colorDistanceScale", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-colorDistanceScale" value={kaleidoscopeWheels.colorDistanceScale} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "colorDistanceScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorShiftSpeed")} value={kaleidoscopeWheels.colorTimeSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "colorTimeSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-colorTimeSpeed" value={kaleidoscopeWheels.colorTimeSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "colorTimeSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorPlaneScale")} value={kaleidoscopeWheels.colorPlaneScale} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "colorPlaneScale", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-colorPlaneScale" value={kaleidoscopeWheels.colorPlaneScale} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "colorPlaneScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("waveSpeed")} value={kaleidoscopeWheels.waveSpeed} min={0} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "waveSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-waveSpeed" value={kaleidoscopeWheels.waveSpeed} min={0} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "waveSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("frequency")} value={kaleidoscopeWheels.waveFrequency} min={10} max={300} step={1} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "waveFrequency", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-waveFrequency" value={kaleidoscopeWheels.waveFrequency} min={10} max={300} step={1} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "waveFrequency", v)} isRTL={isRTL} />

            <ControlSlider label={t("fieldOfView")} value={kaleidoscopeWheels.fovBase} min={0.5} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "fovBase", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-fovBase" value={kaleidoscopeWheels.fovBase} min={0.5} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "fovBase", v)} isRTL={isRTL} />

            <ControlSlider label={t("fovVariation")} value={kaleidoscopeWheels.fovVariation} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "fovVariation", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-fovVariation" value={kaleidoscopeWheels.fovVariation} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "fovVariation", v)} isRTL={isRTL} />

            <ControlSlider label={t("pulseColorSpeed")} value={kaleidoscopeWheels.pulseColorSpeed} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "pulseColorSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-pulseColorSpeed" value={kaleidoscopeWheels.pulseColorSpeed} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "pulseColorSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("power")} value={kaleidoscopeWheels.pulseColorPower} min={1} max={30} step={0.5} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "pulseColorPower", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-pulseColorPower" value={kaleidoscopeWheels.pulseColorPower} min={1} max={30} step={0.5} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "pulseColorPower", v)} isRTL={isRTL} />

            <ControlSlider label={t("contrast")} value={kaleidoscopeWheels.contrastAmount} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "contrastAmount", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-contrastAmount" value={kaleidoscopeWheels.contrastAmount} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "contrastAmount", v)} isRTL={isRTL} />

            <ControlSlider label={t("vignette")} value={kaleidoscopeWheels.vignetteStrength} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "vignetteStrength", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-vignetteStrength" value={kaleidoscopeWheels.vignetteStrength} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "vignetteStrength", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={kaleidoscopeWheels.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-hue" value={kaleidoscopeWheels.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={kaleidoscopeWheels.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-saturation" value={kaleidoscopeWheels.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "saturation", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorCount")} value={kaleidoscopeWheels.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "colorCount", v)} isRTL={isRTL} />
            <CustomSlider id="kaleidoscopeWheels-colorCount" value={kaleidoscopeWheels.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("kaleidoscopeWheels", "colorCount", v)} isRTL={isRTL} />

            {kaleidoscopeWheels.colors.slice(0, kaleidoscopeWheels.colorCount).map((color, index) => (
              <div key={index} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">{t("color")} {index + 1}</span>
                <ColorPicker value={color} onValueChange={(c) => {
                  const updatedColors = [...kaleidoscopeWheels.colors];
                  updatedColors[index] = hsvaToHex(c);
                  updateShaderConfig("kaleidoscopeWheels", "colors", updatedColors);
                }} hideAlpha hideContrastRatio />
              </div>
            ))}
          </>
        )}
        
        {renderShaderControls(
          "discoFever",
          discoFever,
          <>
            <ControlSlider label={t("speed")} value={discoFever.speed} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("discoFever", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-speed" value={discoFever.speed} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("discoFever", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("renderScale")} value={discoFever.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-renderScale" value={discoFever.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraSpeed")} value={discoFever.cameraSpeed} min={0} max={12} step={0.1} onValueChange={(v) => updateShaderConfig("discoFever", "cameraSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-cameraSpeed" value={discoFever.cameraSpeed} min={0} max={12} step={0.1} onValueChange={(v) => updateShaderConfig("discoFever", "cameraSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("fieldOfView")} value={discoFever.fov} min={0.1} max={5.0} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "fov", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-fov" value={discoFever.fov} min={0.1} max={5.0} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "fov", v)} isRTL={isRTL} />

            <ControlSlider label={t("rollAmount")} value={discoFever.rollAmount} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "rollAmount", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-rollAmount" value={discoFever.rollAmount} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "rollAmount", v)} isRTL={isRTL} />

            <ControlSlider label={t("rollSpeed")} value={discoFever.rollSpeed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "rollSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-rollSpeed" value={discoFever.rollSpeed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "rollSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathAmpX")} value={discoFever.pathAmpX} min={0} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("discoFever", "pathAmpX", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-pathAmpX" value={discoFever.pathAmpX} min={0} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("discoFever", "pathAmpX", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathFreqX")} value={discoFever.pathFreqX} min={0} max={1} step={0.005} onValueChange={(v) => updateShaderConfig("discoFever", "pathFreqX", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-pathFreqX" value={discoFever.pathFreqX} min={0} max={1} step={0.005} onValueChange={(v) => updateShaderConfig("discoFever", "pathFreqX", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathAmpY")} value={discoFever.pathAmpY} min={0} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("discoFever", "pathAmpY", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-pathAmpY" value={discoFever.pathAmpY} min={0} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("discoFever", "pathAmpY", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathFreqY")} value={discoFever.pathFreqY} min={0} max={1} step={0.005} onValueChange={(v) => updateShaderConfig("discoFever", "pathFreqY", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-pathFreqY" value={discoFever.pathFreqY} min={0} max={1} step={0.005} onValueChange={(v) => updateShaderConfig("discoFever", "pathFreqY", v)} isRTL={isRTL} />

            <ControlSlider label={t("tunnelRadius")} value={discoFever.tunnelRadius} min={0.5} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("discoFever", "tunnelRadius", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-tunnelRadius" value={discoFever.tunnelRadius} min={0.5} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("discoFever", "tunnelRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("hexesAround")} value={discoFever.tilesAround} min={1} max={96} step={1} onValueChange={(v) => updateShaderConfig("discoFever", "tilesAround", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-tilesAround" value={discoFever.tilesAround} min={1} max={96} step={1} onValueChange={(v) => updateShaderConfig("discoFever", "tilesAround", v)} isRTL={isRTL} />

            <ControlSlider label={t("hexBorder")} value={discoFever.tileBorder} min={0.1} max={0.7} step={0.005} onValueChange={(v) => updateShaderConfig("discoFever", "tileBorder", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-tileBorder" value={discoFever.tileBorder} min={0.1} max={0.7} step={0.005} onValueChange={(v) => updateShaderConfig("discoFever", "tileBorder", v)} isRTL={isRTL} />

            <ControlSlider label={t("tileGlowStrength")} value={discoFever.tileGlowStrength} min={0.2} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "tileGlowStrength", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-tileGlowStrength" value={discoFever.tileGlowStrength} min={0.2} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "tileGlowStrength", v)} isRTL={isRTL} />

            <ControlSlider label={t("tileGlowMin")} value={discoFever.tileGlowMin} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "tileGlowMin", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-tileGlowMin" value={discoFever.tileGlowMin} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "tileGlowMin", v)} isRTL={isRTL} />

            <ControlSlider label={t("tileTwist")} value={discoFever.tileTwist} min={-1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "tileTwist", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-tileTwist" value={discoFever.tileTwist} min={-1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "tileTwist", v)} isRTL={isRTL} />

            <ControlSlider label={t("fbmSpeed")} value={discoFever.fbmSpeed} min={0} max={15} step={0.1} onValueChange={(v) => updateShaderConfig("discoFever", "fbmSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-fbmSpeed" value={discoFever.fbmSpeed} min={0} max={15} step={0.1} onValueChange={(v) => updateShaderConfig("discoFever", "fbmSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("fbmPower")} value={discoFever.fbmPower} min={0.5} max={8} step={0.1} onValueChange={(v) => updateShaderConfig("discoFever", "fbmPower", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-fbmPower" value={discoFever.fbmPower} min={0.5} max={8} step={0.1} onValueChange={(v) => updateShaderConfig("discoFever", "fbmPower", v)} isRTL={isRTL} />

            <ControlSlider label={t("fbmMin")} value={discoFever.fbmMin} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "fbmMin", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-fbmMin" value={discoFever.fbmMin} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "fbmMin", v)} isRTL={isRTL} />

            <ControlSlider label={t("fogDensity")} value={discoFever.fogDensity} min={0} max={0.05} step={0.0005} onValueChange={(v) => updateShaderConfig("discoFever", "fogDensity", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-fogDensity" value={discoFever.fogDensity} min={0} max={0.05} step={0.0005} onValueChange={(v) => updateShaderConfig("discoFever", "fogDensity", v)} isRTL={isRTL} />

            <ControlSlider label={t("vignette")} value={discoFever.vignetteStrength} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "vignetteStrength", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-vignetteStrength" value={discoFever.vignetteStrength} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "vignetteStrength", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={discoFever.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("discoFever", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-hue" value={discoFever.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("discoFever", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={discoFever.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-saturation" value={discoFever.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("discoFever", "saturation", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorCount")} value={discoFever.colorCount} min={1} max={9} step={1} onValueChange={(v) => updateShaderConfig("discoFever", "colorCount", v)} isRTL={isRTL} />
            <CustomSlider id="discoFever-colorCount" value={discoFever.colorCount} min={1} max={9} step={1} onValueChange={(v) => updateShaderConfig("discoFever", "colorCount", v)} isRTL={isRTL} />

            {discoFever.colors.slice(0, discoFever.colorCount).map((color, index) => (
              <div key={index} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">{t("color")} {index + 1}</span>
                <ColorPicker value={color} onValueChange={(c) => {
                  const updatedColors = [...discoFever.colors];
                  updatedColors[index] = hsvaToHex(c);
                  updateShaderConfig("discoFever", "colors", updatedColors);
                }} hideAlpha hideContrastRatio />
              </div>
            ))}
          </>
        )}

        {renderShaderControls(
          "cosmicCity",
          cosmicCity,
          <>
            <ControlSlider label={t("fieldOfView")} value={cosmicCity.fov} min={5} max={140} step={1} onValueChange={(v) => updateShaderConfig("cosmicCity", "fov", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-fov" value={cosmicCity.fov} min={5} max={140} step={1} onValueChange={(v) => updateShaderConfig("cosmicCity", "fov", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraSway")} value={cosmicCity.cameraSway} min={0} max={180} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "cameraSway", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-cameraSway" value={cosmicCity.cameraSway} min={0} max={180} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "cameraSway", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraVertical")} value={cosmicCity.cameraVertical} min={-50} max={50} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "cameraVertical", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-cameraVertical" value={cosmicCity.cameraVertical} min={-50} max={50} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "cameraVertical", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraRoll")} value={cosmicCity.cameraRoll} min={0} max={0.18} step={0.001} onValueChange={(v) => updateShaderConfig("cosmicCity", "cameraRoll", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-cameraRoll" value={cosmicCity.cameraRoll} min={0} max={0.18} step={0.001} onValueChange={(v) => updateShaderConfig("cosmicCity", "cameraRoll", v)} isRTL={isRTL} />

            <ControlSlider label={t("speed")} value={cosmicCity.speed} min={0} max={30} step={0.1} onValueChange={(v) => updateShaderConfig("cosmicCity", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-speed" value={cosmicCity.speed} min={0} max={30} step={0.1} onValueChange={(v) => updateShaderConfig("cosmicCity", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("pulse")} value={cosmicCity.pulse} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "pulse", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-pulse" value={cosmicCity.pulse} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "pulse", v)} isRTL={isRTL} />

            <ControlSlider label={t("buildingDensity")} value={cosmicCity.buildingDensity} min={0.2} max={1.3} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "buildingDensity", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-buildingDensity" value={cosmicCity.buildingDensity} min={0.2} max={1.3} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "buildingDensity", v)} isRTL={isRTL} />

            <ControlSlider label={t("corridorWidth")} value={cosmicCity.corridorWidth} min={2} max={88} step={0.1} onValueChange={(v) => updateShaderConfig("cosmicCity", "corridorWidth", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-corridorWidth" value={cosmicCity.corridorWidth} min={2} max={88} step={0.1} onValueChange={(v) => updateShaderConfig("cosmicCity", "corridorWidth", v)} isRTL={isRTL} />

            <ControlSlider label={t("curveAmount")} value={cosmicCity.curveAmount} min={0} max={36} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "curveAmount", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-curveAmount" value={cosmicCity.curveAmount} min={0} max={36} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "curveAmount", v)} isRTL={isRTL} />

            <ControlSlider label={t("cityHeight")} value={cosmicCity.cityHeight} min={0.4} max={17} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "cityHeight", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-cityHeight" value={cosmicCity.cityHeight} min={0.4} max={17} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "cityHeight", v)} isRTL={isRTL} />

            <ControlSlider label={t("pointSize")} value={cosmicCity.pointSize} min={0.1} max={4} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "pointSize", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-pointSize" value={cosmicCity.pointSize} min={0.1} max={4} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "pointSize", v)} isRTL={isRTL} />

            <ControlSlider label={t("pointOpacity")} value={cosmicCity.pointOpacity} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "pointOpacity", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-pointOpacity" value={cosmicCity.pointOpacity} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "pointOpacity", v)} isRTL={isRTL} />

            <ControlSlider label={t("edgeOpacity")} value={cosmicCity.edgeOpacity} min={0} max={0.8} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "edgeOpacity", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-edgeOpacity" value={cosmicCity.edgeOpacity} min={0} max={0.8} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "edgeOpacity", v)} isRTL={isRTL} />

            <ControlSlider label={t("bloomStrength")} value={cosmicCity.bloomStrength} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "bloomStrength", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-bloomStrength" value={cosmicCity.bloomStrength} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "bloomStrength", v)} isRTL={isRTL} />

            <ControlSlider label={t("bloomRadius")} value={cosmicCity.bloomRadius} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "bloomRadius", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-bloomRadius" value={cosmicCity.bloomRadius} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "bloomRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("bloomThreshold")} value={cosmicCity.bloomThreshold} min={0} max={1} step={0.001} onValueChange={(v) => updateShaderConfig("cosmicCity", "bloomThreshold", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-bloomThreshold" value={cosmicCity.bloomThreshold} min={0} max={1} step={0.001} onValueChange={(v) => updateShaderConfig("cosmicCity", "bloomThreshold", v)} isRTL={isRTL} />

            <ControlSlider label={t("trailPersistence")} value={cosmicCity.trailPersistence} min={0} max={0.97} step={0.001} onValueChange={(v) => updateShaderConfig("cosmicCity", "trailPersistence", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-trailPersistence" value={cosmicCity.trailPersistence} min={0} max={0.97} step={0.001} onValueChange={(v) => updateShaderConfig("cosmicCity", "trailPersistence", v)} isRTL={isRTL} />

            <ControlSlider label={t("chromaticShift")} value={cosmicCity.chromaticShift} min={0} max={0.012} step={0.0001} onValueChange={(v) => updateShaderConfig("cosmicCity", "chromaticShift", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-chromaticShift" value={cosmicCity.chromaticShift} min={0} max={0.012} step={0.0001} onValueChange={(v) => updateShaderConfig("cosmicCity", "chromaticShift", v)} isRTL={isRTL} />

            <ControlSlider label={t("grainNoise")} value={cosmicCity.grain} min={0} max={0.2} step={0.001} onValueChange={(v) => updateShaderConfig("cosmicCity", "grain", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-grain" value={cosmicCity.grain} min={0} max={0.2} step={0.001} onValueChange={(v) => updateShaderConfig("cosmicCity", "grain", v)} isRTL={isRTL} />

            <ControlSlider label={t("vignette")} value={cosmicCity.vignette} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "vignette", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-vignette" value={cosmicCity.vignette} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "vignette", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={cosmicCity.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("cosmicCity", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-hue" value={cosmicCity.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("cosmicCity", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={cosmicCity.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="cosmicCity-saturation" value={cosmicCity.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("cosmicCity", "saturation", v)} isRTL={isRTL} />

            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("color")} 1</span>
              <ColorPicker value={cosmicCity.color1} onValueChange={(c) => updateShaderConfig("cosmicCity", "color1", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("color")} 2</span>
              <ColorPicker value={cosmicCity.color2} onValueChange={(c) => updateShaderConfig("cosmicCity", "color2", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("color")} 3</span>
              <ColorPicker value={cosmicCity.color3} onValueChange={(c) => updateShaderConfig("cosmicCity", "color3", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("color")} 4</span>
              <ColorPicker value={cosmicCity.color4} onValueChange={(c) => updateShaderConfig("cosmicCity", "color4", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>
          </>
        )}

        {renderShaderControls(
          "quantumShapes",
          quantumShapes,
          <>
            <ControlSlider label={t("speed")} value={quantumShapes.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-speed" value={quantumShapes.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("renderScale")} value={quantumShapes.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-renderScale" value={quantumShapes.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraOrbitRadius")} value={quantumShapes.cameraOrbitRadius} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("quantumShapes", "cameraOrbitRadius", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-cameraOrbitRadius" value={quantumShapes.cameraOrbitRadius} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("quantumShapes", "cameraOrbitRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraOrbitSpeed")} value={quantumShapes.cameraOrbitSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "cameraOrbitSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-cameraOrbitSpeed" value={quantumShapes.cameraOrbitSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "cameraOrbitSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraForwardSpeed")} value={quantumShapes.cameraForwardSpeed} min={0} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("quantumShapes", "cameraForwardSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-cameraForwardSpeed" value={quantumShapes.cameraForwardSpeed} min={0} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("quantumShapes", "cameraForwardSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("fieldOfView")} value={quantumShapes.fov} min={0.4} max={2.5} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "fov", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-fov" value={quantumShapes.fov} min={0.4} max={2.5} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "fov", v)} isRTL={isRTL} />

            <ControlSlider label={t("gridSize")} value={quantumShapes.gridSize} min={1} max={16} step={0.1} onValueChange={(v) => updateShaderConfig("quantumShapes", "gridSize", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-gridSize" value={quantumShapes.gridSize} min={1.7} max={16} step={0.1} onValueChange={(v) => updateShaderConfig("quantumShapes", "gridSize", v)} isRTL={isRTL} />

            <ControlSlider label={t("foldIterations")} value={quantumShapes.foldIterations} min={1} max={12} step={1} onValueChange={(v) => updateShaderConfig("quantumShapes", "foldIterations", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-foldIterations" value={quantumShapes.foldIterations} min={1} max={12} step={1} onValueChange={(v) => updateShaderConfig("quantumShapes", "foldIterations", v)} isRTL={isRTL} />

            <ControlSlider label={t("foldWarpAmount")} value={quantumShapes.foldWarpAmount} min={0} max={0.1} step={0.001} onValueChange={(v) => updateShaderConfig("quantumShapes", "foldWarpAmount", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-foldWarpAmount" value={quantumShapes.foldWarpAmount} min={0} max={0.1} step={0.001} onValueChange={(v) => updateShaderConfig("quantumShapes", "foldWarpAmount", v)} isRTL={isRTL} />

            <ControlSlider label={t("foldWarpFrequency")} value={quantumShapes.foldWarpFrequency} min={0} max={40} step={0.5} onValueChange={(v) => updateShaderConfig("quantumShapes", "foldWarpFrequency", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-foldWarpFrequency" value={quantumShapes.foldWarpFrequency} min={0} max={40} step={0.5} onValueChange={(v) => updateShaderConfig("quantumShapes", "foldWarpFrequency", v)} isRTL={isRTL} />

            <ControlSlider label={t("morphSpeed")} value={quantumShapes.morphSpeed} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "morphSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-morphSpeed" value={quantumShapes.morphSpeed} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "morphSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("pyramidRadius")} value={quantumShapes.pyramidRadius} min={0.1} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "pyramidRadius", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-pyramidRadius" value={quantumShapes.pyramidRadius} min={0.1} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "pyramidRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("pyramidTwist")} value={quantumShapes.pyramidTwist} min={-1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "pyramidTwist", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-pyramidTwist" value={quantumShapes.pyramidTwist} min={-1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "pyramidTwist", v)} isRTL={isRTL} />

            <ControlSlider label={t("sphereRadius")} value={quantumShapes.sphereRadius} min={0.1} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "sphereRadius", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-sphereRadius" value={quantumShapes.sphereRadius} min={0.1} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "sphereRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("sphereOffsetBase")} value={quantumShapes.sphereOffsetBase} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "sphereOffsetBase", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-sphereOffsetBase" value={quantumShapes.sphereOffsetBase} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "sphereOffsetBase", v)} isRTL={isRTL} />

            <ControlSlider label={t("sphereOffsetAmp")} value={quantumShapes.sphereOffsetAmp} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "sphereOffsetAmp", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-sphereOffsetAmp" value={quantumShapes.sphereOffsetAmp} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "sphereOffsetAmp", v)} isRTL={isRTL} />

            <ControlSlider label={t("cubeRadius")} value={quantumShapes.cubeRadius} min={0.1} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "cubeRadius", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-cubeRadius" value={quantumShapes.cubeRadius} min={0.1} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "cubeRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("cubeOffsetBase")} value={quantumShapes.cubeOffsetBase} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "cubeOffsetBase", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-cubeOffsetBase" value={quantumShapes.cubeOffsetBase} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "cubeOffsetBase", v)} isRTL={isRTL} />

            <ControlSlider label={t("cubeOffsetAmp")} value={quantumShapes.cubeOffsetAmp} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "cubeOffsetAmp", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-cubeOffsetAmp" value={quantumShapes.cubeOffsetAmp} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "cubeOffsetAmp", v)} isRTL={isRTL} />

            <ControlSlider label={t("precision")} value={quantumShapes.marchSteps} min={22} max={200} step={1} onValueChange={(v) => updateShaderConfig("quantumShapes", "marchSteps", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-marchSteps" value={quantumShapes.marchSteps} min={22} max={200} step={1} onValueChange={(v) => updateShaderConfig("quantumShapes", "marchSteps", v)} isRTL={isRTL} />

            <ControlSlider label={t("stepScale")} value={quantumShapes.stepScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "stepScale", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-stepScale" value={quantumShapes.stepScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "stepScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorPhaseScale")} value={quantumShapes.colorPhaseScale} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "colorPhaseScale", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-colorPhaseScale" value={quantumShapes.colorPhaseScale} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "colorPhaseScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorShiftSpeed")} value={quantumShapes.colorTimeSpeed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "colorTimeSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-colorTimeSpeed" value={quantumShapes.colorTimeSpeed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "colorTimeSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("fogDensity")} value={quantumShapes.fogDensity} min={0} max={0.2} step={0.001} onValueChange={(v) => updateShaderConfig("quantumShapes", "fogDensity", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-fogDensity" value={quantumShapes.fogDensity} min={0} max={0.2} step={0.001} onValueChange={(v) => updateShaderConfig("quantumShapes", "fogDensity", v)} isRTL={isRTL} />

            <ControlSlider label={t("exposure")} value={quantumShapes.exposure} min={0.01} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "exposure", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-exposure" value={quantumShapes.exposure} min={0.01} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "exposure", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={quantumShapes.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("quantumShapes", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-hue" value={quantumShapes.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("quantumShapes", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={quantumShapes.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-saturation" value={quantumShapes.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("quantumShapes", "saturation", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorCount")} value={quantumShapes.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("quantumShapes", "colorCount", v)} isRTL={isRTL} />
            <CustomSlider id="quantumShapes-colorCount" value={quantumShapes.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("quantumShapes", "colorCount", v)} isRTL={isRTL} />

            {quantumShapes.colors.slice(0, quantumShapes.colorCount).map((color, index) => (
              <div key={index} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">{t("color")} {index + 1}</span>
                <ColorPicker value={color} onValueChange={(c) => {
                  const updatedColors = [...quantumShapes.colors];
                  updatedColors[index] = hsvaToHex(c);
                  updateShaderConfig("quantumShapes", "colors", updatedColors);
                }} hideAlpha hideContrastRatio />
              </div>
            ))}
          </>
        )}

        {renderShaderControls(
          "glassOrigin",
          glassOrigin,
          <>
            <ControlSlider label={t("speed")} value={glassOrigin.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("glassOrigin", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-speed" value={glassOrigin.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("glassOrigin", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("renderScale")} value={glassOrigin.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("glassOrigin", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-renderScale" value={glassOrigin.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("glassOrigin", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathRadius")} value={glassOrigin.pathRadius} min={0} max={40} step={0.5} onValueChange={(v) => updateShaderConfig("glassOrigin", "pathRadius", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-pathRadius" value={glassOrigin.pathRadius} min={0} max={40} step={0.5} onValueChange={(v) => updateShaderConfig("glassOrigin", "pathRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathFreqX")} value={glassOrigin.pathFreqX} min={0} max={0.2} step={0.001} onValueChange={(v) => updateShaderConfig("glassOrigin", "pathFreqX", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-pathFreqX" value={glassOrigin.pathFreqX} min={0} max={0.2} step={0.001} onValueChange={(v) => updateShaderConfig("glassOrigin", "pathFreqX", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathAmpY")} value={glassOrigin.pathYAmp} min={0} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("glassOrigin", "pathYAmp", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-pathYAmp" value={glassOrigin.pathYAmp} min={0} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("glassOrigin", "pathYAmp", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathFreqY")} value={glassOrigin.pathFreqY} min={0} max={0.3} step={0.001} onValueChange={(v) => updateShaderConfig("glassOrigin", "pathFreqY", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-pathFreqY" value={glassOrigin.pathFreqY} min={0} max={0.3} step={0.001} onValueChange={(v) => updateShaderConfig("glassOrigin", "pathFreqY", v)} isRTL={isRTL} />

            <ControlSlider label={t("twist")} value={glassOrigin.rotTwistScale} min={0} max={0.3} step={0.005} onValueChange={(v) => updateShaderConfig("glassOrigin", "rotTwistScale", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-rotTwistScale" value={glassOrigin.rotTwistScale} min={0} max={0.3} step={0.005} onValueChange={(v) => updateShaderConfig("glassOrigin", "rotTwistScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("noiseFrequency")} value={glassOrigin.noiseScale2} min={0.02} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("glassOrigin", "noiseScale2", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-noiseScale2" value={glassOrigin.noiseScale2} min={0.02} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("glassOrigin", "noiseScale2", v)} isRTL={isRTL} />

            <ControlSlider label={t("noise")} value={glassOrigin.noiseAmp2} min={0} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("glassOrigin", "noiseAmp2", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-noiseAmp2" value={glassOrigin.noiseAmp2} min={0} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("glassOrigin", "noiseAmp2", v)} isRTL={isRTL} />

            <ControlSlider label={t("waveAmp")} value={glassOrigin.waveAmp} min={0} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("glassOrigin", "waveAmp", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-waveAmp" value={glassOrigin.waveAmp} min={0} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("glassOrigin", "waveAmp", v)} isRTL={isRTL} />

            <ControlSlider label={t("offset")} value={glassOrigin.waveOffset} min={-1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("glassOrigin", "waveOffset", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-waveOffset" value={glassOrigin.waveOffset} min={-1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("glassOrigin", "waveOffset", v)} isRTL={isRTL} />

            <ControlSlider label={t("yInfluence")} value={glassOrigin.yInfluence} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("glassOrigin", "yInfluence", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-yInfluence" value={glassOrigin.yInfluence} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("glassOrigin", "yInfluence", v)} isRTL={isRTL} />

            <ControlSlider label={t("distance")} value={glassOrigin.distanceThreshold} min={0} max={4} step={0.02} onValueChange={(v) => updateShaderConfig("glassOrigin", "distanceThreshold", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-distanceThreshold" value={glassOrigin.distanceThreshold} min={0} max={4} step={0.02} onValueChange={(v) => updateShaderConfig("glassOrigin", "distanceThreshold", v)} isRTL={isRTL} />

            <ControlSlider label={t("thresholdFreqZ")} value={glassOrigin.thresholdFreqZ} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("glassOrigin", "thresholdFreqZ", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-thresholdFreqZ" value={glassOrigin.thresholdFreqZ} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("glassOrigin", "thresholdFreqZ", v)} isRTL={isRTL} />

            <ControlSlider label={t("thresholdFreqY")} value={glassOrigin.thresholdFreqY} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("glassOrigin", "thresholdFreqY", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-thresholdFreqY" value={glassOrigin.thresholdFreqY} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("glassOrigin", "thresholdFreqY", v)} isRTL={isRTL} />

            <ControlSlider label={t("precision")} value={glassOrigin.marchSteps} min={40} max={260} step={1} onValueChange={(v) => updateShaderConfig("glassOrigin", "marchSteps", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-marchSteps" value={glassOrigin.marchSteps} min={40} max={260} step={1} onValueChange={(v) => updateShaderConfig("glassOrigin", "marchSteps", v)} isRTL={isRTL} />

            <ControlSlider label={t("stepMinBase")} value={glassOrigin.stepMinBase} min={0.0001} max={0.02} step={0.0001} onValueChange={(v) => updateShaderConfig("glassOrigin", "stepMinBase", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-stepMinBase" value={glassOrigin.stepMinBase} min={0.0001} max={0.02} step={0.0001} onValueChange={(v) => updateShaderConfig("glassOrigin", "stepMinBase", v)} isRTL={isRTL} />

            <ControlSlider label={t("stepMult")} value={glassOrigin.stepMult} min={0} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("glassOrigin", "stepMult", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-stepMult" value={glassOrigin.stepMult} min={0} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("glassOrigin", "stepMult", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorPhaseScale")} value={glassOrigin.colorPhaseScale} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("glassOrigin", "colorPhaseScale", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-colorPhaseScale" value={glassOrigin.colorPhaseScale} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("glassOrigin", "colorPhaseScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorPlaneScale")} value={glassOrigin.colorIterScale} min={0} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("glassOrigin", "colorIterScale", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-colorIterScale" value={glassOrigin.colorIterScale} min={0} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("glassOrigin", "colorIterScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("fieldOfView")} value={glassOrigin.fov} min={0.5} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("glassOrigin", "fov", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-fov" value={glassOrigin.fov} min={0.5} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("glassOrigin", "fov", v)} isRTL={isRTL} />

            <ControlSlider label={t("exposure")} value={glassOrigin.exposure} min={0} max={4} step={0.01} onValueChange={(v) => updateShaderConfig("glassOrigin", "exposure", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-exposure" value={glassOrigin.exposure} min={0} max={4} step={0.01} onValueChange={(v) => updateShaderConfig("glassOrigin", "exposure", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={glassOrigin.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("glassOrigin", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-hue" value={glassOrigin.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("glassOrigin", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={glassOrigin.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("glassOrigin", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-saturation" value={glassOrigin.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("glassOrigin", "saturation", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorCount")} value={glassOrigin.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("glassOrigin", "colorCount", v)} isRTL={isRTL} />
            <CustomSlider id="glassOrigin-colorCount" value={glassOrigin.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("glassOrigin", "colorCount", v)} isRTL={isRTL} />

            {glassOrigin.colors.slice(0, glassOrigin.colorCount).map((color, index) => (
              <div key={index} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">{t("color")} {index + 1}</span>
                <ColorPicker value={color} onValueChange={(c) => {
                  const updatedColors = [...glassOrigin.colors];
                  updatedColors[index] = hsvaToHex(c);
                  updateShaderConfig("glassOrigin", "colors", updatedColors);
                }} hideAlpha hideContrastRatio />
              </div>
            ))}
          </>
        )}

        {renderShaderControls(
          "mandalaDice",
          mandalaDice,
          <>
            <ControlSlider label={t("speed")} value={mandalaDice.speed} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("mandalaDice", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="mandalaDice-speed" value={mandalaDice.speed} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("mandalaDice", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("renderScale")} value={mandalaDice.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("mandalaDice", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="mandalaDice-renderScale" value={mandalaDice.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("mandalaDice", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("rotSpeedYZ")} value={mandalaDice.rotSpeedYZ} min={-1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("mandalaDice", "rotSpeedYZ", v)} isRTL={isRTL} />
            <CustomSlider id="mandalaDice-rotSpeedYZ" value={mandalaDice.rotSpeedYZ} min={-1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("mandalaDice", "rotSpeedYZ", v)} isRTL={isRTL} />

            <ControlSlider label={t("rotSpeedXZ")} value={mandalaDice.rotSpeedXZ} min={-1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("mandalaDice", "rotSpeedXZ", v)} isRTL={isRTL} />
            <CustomSlider id="mandalaDice-rotSpeedXZ" value={mandalaDice.rotSpeedXZ} min={-1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("mandalaDice", "rotSpeedXZ", v)} isRTL={isRTL} />

            <ControlSlider label={t("buckyRadius")} value={mandalaDice.buckyRadius} min={0.5} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("mandalaDice", "buckyRadius", v)} isRTL={isRTL} />
            <CustomSlider id="mandalaDice-buckyRadius" value={mandalaDice.buckyRadius} min={0.5} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("mandalaDice", "buckyRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("buckyBevel")} value={mandalaDice.buckyBevel} min={0} max={0.3} step={0.005} onValueChange={(v) => updateShaderConfig("mandalaDice", "buckyBevel", v)} isRTL={isRTL} />
            <CustomSlider id="mandalaDice-buckyBevel" value={mandalaDice.buckyBevel} min={0} max={0.3} step={0.005} onValueChange={(v) => updateShaderConfig("mandalaDice", "buckyBevel", v)} isRTL={isRTL} />

            <ControlSlider label={t("buckyPentagonScale")} value={mandalaDice.buckyPentagonScale} min={0.5} max={1.2} step={0.005} onValueChange={(v) => updateShaderConfig("mandalaDice", "buckyPentagonScale", v)} isRTL={isRTL} />
            <CustomSlider id="mandalaDice-buckyPentagonScale" value={mandalaDice.buckyPentagonScale} min={0.5} max={1.2} step={0.005} onValueChange={(v) => updateShaderConfig("mandalaDice", "buckyPentagonScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraDistance")} value={mandalaDice.cameraDistance} min={2} max={12} step={0.1} onValueChange={(v) => updateShaderConfig("mandalaDice", "cameraDistance", v)} isRTL={isRTL} />
            <CustomSlider id="mandalaDice-cameraDistance" value={mandalaDice.cameraDistance} min={2} max={12} step={0.1} onValueChange={(v) => updateShaderConfig("mandalaDice", "cameraDistance", v)} isRTL={isRTL} />

            <ControlSlider label={t("fieldOfView")} value={mandalaDice.cameraFov} min={0.5} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("mandalaDice", "cameraFov", v)} isRTL={isRTL} />
            <CustomSlider id="mandalaDice-cameraFov" value={mandalaDice.cameraFov} min={0.5} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("mandalaDice", "cameraFov", v)} isRTL={isRTL} />

            <ControlSlider label={t("mandalaScale")} value={mandalaDice.mandalaScale} min={0.1} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("mandalaDice", "mandalaScale", v)} isRTL={isRTL} />
            <CustomSlider id="mandalaDice-mandalaScale" value={mandalaDice.mandalaScale} min={0.1} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("mandalaDice", "mandalaScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("logoRadius")} value={mandalaDice.logoRadius} min={0.05} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("mandalaDice", "logoRadius", v)} isRTL={isRTL} />
            <CustomSlider id="mandalaDice-logoRadius" value={mandalaDice.logoRadius} min={0.05} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("mandalaDice", "logoRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("logoOffset")} value={mandalaDice.logoOffset} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("mandalaDice", "logoOffset", v)} isRTL={isRTL} />
            <CustomSlider id="mandalaDice-logoOffset" value={mandalaDice.logoOffset} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("mandalaDice", "logoOffset", v)} isRTL={isRTL} />

            <ControlSlider label={t("logoWidth")} value={mandalaDice.logoWidth} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("mandalaDice", "logoWidth", v)} isRTL={isRTL} />
            <CustomSlider id="mandalaDice-logoWidth" value={mandalaDice.logoWidth} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("mandalaDice", "logoWidth", v)} isRTL={isRTL} />

            <ControlSlider label={t("kaleidoscopeRepMin")} value={mandalaDice.kaleidoscopeRepMin} min={2} max={20} step={1} onValueChange={(v) => updateShaderConfig("mandalaDice", "kaleidoscopeRepMin", v)} isRTL={isRTL} />
            <CustomSlider id="mandalaDice-kaleidoscopeRepMin" value={mandalaDice.kaleidoscopeRepMin} min={2} max={20} step={1} onValueChange={(v) => updateShaderConfig("mandalaDice", "kaleidoscopeRepMin", v)} isRTL={isRTL} />

            <ControlSlider label={t("kaleidoscopeRepMax")} value={mandalaDice.kaleidoscopeRepMax} min={10} max={60} step={1} onValueChange={(v) => updateShaderConfig("mandalaDice", "kaleidoscopeRepMax", v)} isRTL={isRTL} />
            <CustomSlider id="mandalaDice-kaleidoscopeRepMax" value={mandalaDice.kaleidoscopeRepMax} min={10} max={60} step={1} onValueChange={(v) => updateShaderConfig("mandalaDice", "kaleidoscopeRepMax", v)} isRTL={isRTL} />

            <ControlSlider label={t("glowIntensity")} value={mandalaDice.glowIntensity} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("mandalaDice", "glowIntensity", v)} isRTL={isRTL} />
            <CustomSlider id="mandalaDice-glowIntensity" value={mandalaDice.glowIntensity} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("mandalaDice", "glowIntensity", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={mandalaDice.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("mandalaDice", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="mandalaDice-hue" value={mandalaDice.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("mandalaDice", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={mandalaDice.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("mandalaDice", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="mandalaDice-saturation" value={mandalaDice.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("mandalaDice", "saturation", v)} isRTL={isRTL} />

            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("backgroundColor")}</span>
              <ColorPicker value={mandalaDice.colorBack} onValueChange={(c) => updateShaderConfig("mandalaDice", "colorBack", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>

            <ControlSlider label={t("colorCount")} value={mandalaDice.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("mandalaDice", "colorCount", v)} isRTL={isRTL} />
            <CustomSlider id="mandalaDice-colorCount" value={mandalaDice.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("mandalaDice", "colorCount", v)} isRTL={isRTL} />

            {mandalaDice.colors.slice(0, mandalaDice.colorCount).map((color, index) => (
              <div key={index} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">{t("color")} {index + 1}</span>
                <ColorPicker value={color} onValueChange={(c) => {
                  const updated = [...mandalaDice.colors];
                  updated[index] = hsvaToHex(c);
                  updateShaderConfig("mandalaDice", "colors", updated);
                }} hideAlpha hideContrastRatio />
              </div>
            ))}
          </>
        )}

        {renderShaderControls(
          "chromaticUniverse",
          chromaticUniverse,
          <>
            <ControlSlider label={t("speed")} value={chromaticUniverse.speed} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="chromaticUniverse-speed" value={chromaticUniverse.speed} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("renderScale")} value={chromaticUniverse.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="chromaticUniverse-renderScale" value={chromaticUniverse.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathRadius")} value={chromaticUniverse.pathRadius} min={1} max={30} step={0.5} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "pathRadius", v)} isRTL={isRTL} />
            <CustomSlider id="chromaticUniverse-pathRadius" value={chromaticUniverse.pathRadius} min={1} max={30} step={0.5} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "pathRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathFreqX")} value={chromaticUniverse.pathFreqX} min={0} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "pathFreqX", v)} isRTL={isRTL} />
            <CustomSlider id="chromaticUniverse-pathFreqX" value={chromaticUniverse.pathFreqX} min={0} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "pathFreqX", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathFreqY")} value={chromaticUniverse.pathFreqY} min={0} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "pathFreqY", v)} isRTL={isRTL} />
            <CustomSlider id="chromaticUniverse-pathFreqY" value={chromaticUniverse.pathFreqY} min={0} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "pathFreqY", v)} isRTL={isRTL} />

            <ControlSlider label={t("orbSize")} value={chromaticUniverse.orbSize} min={0.001} max={0.1} step={0.001} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "orbSize", v)} isRTL={isRTL} />
            <CustomSlider id="chromaticUniverse-orbSize" value={chromaticUniverse.orbSize} min={0.001} max={0.1} step={0.001} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "orbSize", v)} isRTL={isRTL} />

            <ControlSlider label={t("wallBrightness")} value={chromaticUniverse.wallBrightness} min={0.1} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "wallBrightness", v)} isRTL={isRTL} />
            <CustomSlider id="chromaticUniverse-wallBrightness" value={chromaticUniverse.wallBrightness} min={0.1} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "wallBrightness", v)} isRTL={isRTL} />

            <ControlSlider label={t("orbBrightness")} value={chromaticUniverse.orbBrightness} min={0.1} max={30} step={0.5} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "orbBrightness", v)} isRTL={isRTL} />
            <CustomSlider id="chromaticUniverse-orbBrightness" value={chromaticUniverse.orbBrightness} min={0.1} max={30} step={0.5} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "orbBrightness", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={chromaticUniverse.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="chromaticUniverse-hue" value={chromaticUniverse.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={chromaticUniverse.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="chromaticUniverse-saturation" value={chromaticUniverse.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "saturation", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorCount")} value={chromaticUniverse.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "colorCount", v)} isRTL={isRTL} />
            <CustomSlider id="chromaticUniverse-colorCount" value={chromaticUniverse.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("chromaticUniverse", "colorCount", v)} isRTL={isRTL} />

            {chromaticUniverse.colors.slice(0, chromaticUniverse.colorCount).map((color, index) => (
              <div key={index} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">{t("color")} {index + 1}</span>
                <ColorPicker value={color} onValueChange={(c) => {
                  const updated = [...chromaticUniverse.colors];
                  updated[index] = hsvaToHex(c);
                  updateShaderConfig("chromaticUniverse", "colors", updated);
                }} hideAlpha hideContrastRatio />
              </div>
            ))}
          </>
        )}

        {renderShaderControls(
          "cubicSpin",
          cubicSpin,
          <>
            <ControlSlider label={t("speed")} value={cubicSpin.speed} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("cubicSpin", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="cubicSpin-speed" value={cubicSpin.speed} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("cubicSpin", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("renderScale")} value={cubicSpin.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("cubicSpin", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="cubicSpin-renderScale" value={cubicSpin.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("cubicSpin", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("twistAmount")} value={cubicSpin.twistAmount} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("cubicSpin", "twistAmount", v)} isRTL={isRTL} />
            <CustomSlider id="cubicSpin-twistAmount" value={cubicSpin.twistAmount} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("cubicSpin", "twistAmount", v)} isRTL={isRTL} />

            <ControlSlider label={t("cubeSize")} value={cubicSpin.cubeSize} min={0.1} max={1.5} step={0.01} onValueChange={(v) => updateShaderConfig("cubicSpin", "cubeSize", v)} isRTL={isRTL} />
            <CustomSlider id="cubicSpin-cubeSize" value={cubicSpin.cubeSize} min={0.1} max={1.5} step={0.01} onValueChange={(v) => updateShaderConfig("cubicSpin", "cubeSize", v)} isRTL={isRTL} />

            <ControlSlider label={t("tunnelRadius")} value={cubicSpin.tunnelRadius} min={1} max={8} step={0.1} onValueChange={(v) => updateShaderConfig("cubicSpin", "tunnelRadius", v)} isRTL={isRTL} />
            <CustomSlider id="cubicSpin-tunnelRadius" value={cubicSpin.tunnelRadius} min={1} max={8} step={0.1} onValueChange={(v) => updateShaderConfig("cubicSpin", "tunnelRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("pulseSpeed")} value={cubicSpin.pulseSpeed} min={0} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("cubicSpin", "pulseSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="cubicSpin-pulseSpeed" value={cubicSpin.pulseSpeed} min={0} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("cubicSpin", "pulseSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={cubicSpin.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("cubicSpin", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="cubicSpin-hue" value={cubicSpin.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("cubicSpin", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={cubicSpin.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("cubicSpin", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="cubicSpin-saturation" value={cubicSpin.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("cubicSpin", "saturation", v)} isRTL={isRTL} />

            {[
              { key: "colorA", labelIndex: 1 },
              { key: "colorB", labelIndex: 2 },
              { key: "colorC", labelIndex: 3 },
            ].map(({ key, labelIndex }) => (
              <div key={key} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">{t("color")} {labelIndex}</span>
                <ColorPicker
                  value={(cubicSpin as unknown as Record<string, string>)[key]}
                  onValueChange={(c) => updateShaderConfig("cubicSpin", key as "colorA" | "colorB" | "colorC", hsvaToHex(c))}
                  hideAlpha
                  hideContrastRatio
                />
              </div>
            ))}

            {[
              { key: "coreLightColor", label: t("coreLightColor") },
              { key: "camLightColor", label: t("camLightColor") },
              { key: "pulseColor", label: t("pulseColor") },
              { key: "colorBack", label: t("backgroundColor") },
            ].map(({ key, label }) => (
              <div key={key} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">{label}</span>
                <ColorPicker
                  value={(cubicSpin as unknown as Record<string, string>)[key]}
                  onValueChange={(c) => updateShaderConfig("cubicSpin", key as "coreLightColor" | "camLightColor" | "pulseColor" | "colorBack", hsvaToHex(c))}
                  hideAlpha
                  hideContrastRatio
                />
              </div>
            ))}
          </>
        )}

        {renderShaderControls(
          "membranes",
          membranes,
          <>
            <ControlSlider label={t("speed")} value={membranes.speed} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("membranes", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="membranes-speed" value={membranes.speed} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("membranes", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("renderScale")} value={membranes.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("membranes", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="membranes-renderScale" value={membranes.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("membranes", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("fieldOfView")} value={membranes.fov} min={0.4} max={2.5} step={0.01} onValueChange={(v) => updateShaderConfig("membranes", "fov", v)} isRTL={isRTL} />
            <CustomSlider id="membranes-fov" value={membranes.fov} min={0.4} max={2.5} step={0.01} onValueChange={(v) => updateShaderConfig("membranes", "fov", v)} isRTL={isRTL} />

            <ControlSlider label={t("gyroidScale")} value={membranes.gyroidScale} min={0.2} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("membranes", "gyroidScale", v)} isRTL={isRTL} />
            <CustomSlider id="membranes-gyroidScale" value={membranes.gyroidScale} min={0.2} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("membranes", "gyroidScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("pulseSpeed")} value={membranes.pulseSpeed} min={0} max={15} step={0.1} onValueChange={(v) => updateShaderConfig("membranes", "pulseSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="membranes-pulseSpeed" value={membranes.pulseSpeed} min={0} max={15} step={0.1} onValueChange={(v) => updateShaderConfig("membranes", "pulseSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={membranes.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("membranes", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="membranes-hue" value={membranes.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("membranes", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={membranes.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("membranes", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="membranes-saturation" value={membranes.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("membranes", "saturation", v)} isRTL={isRTL} />

            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("backgroundColor")}</span>
              <ColorPicker value={membranes.colorBack} onValueChange={(c) => updateShaderConfig("membranes", "colorBack", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>

            {membranes.colors.map((color, index) => (
              <div key={index} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">{t("color")} {index + 1}</span>
                <ColorPicker value={color} onValueChange={(c) => {
                  const updated = [...membranes.colors];
                  updated[index] = hsvaToHex(c);
                  updateShaderConfig("membranes", "colors", updated);
                }} hideAlpha hideContrastRatio />
              </div>
            ))}
          </>
        )}

        {renderShaderControls(
          "quantumCore",
          quantumCore,
          <>
            <ControlSlider label={t("speed")} value={quantumCore.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-speed" value={quantumCore.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("renderScale")} value={quantumCore.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-renderScale" value={quantumCore.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("travelRate")} value={quantumCore.travelRate} min={-2} max={2} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "travelRate", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-travelRate" value={quantumCore.travelRate} min={-2} max={2} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "travelRate", v)} isRTL={isRTL} />

            <ControlSlider label={t("mirrorSpeed")} value={quantumCore.mirrorSpeed} min={0} max={1} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "mirrorSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-mirrorSpeed" value={quantumCore.mirrorSpeed} min={0} max={1} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "mirrorSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraFadeNear")} value={quantumCore.cameraFadeNear} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "cameraFadeNear", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-cameraFadeNear" value={quantumCore.cameraFadeNear} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "cameraFadeNear", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraFadeFar")} value={quantumCore.cameraFadeFar} min={0.44} max={10} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "cameraFadeFar", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-cameraFadeFar" value={quantumCore.cameraFadeFar} min={0.44} max={10} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "cameraFadeFar", v)} isRTL={isRTL} />

            <ControlSlider label={t("startDepth")} value={quantumCore.startDepth} min={0.01} max={10} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "startDepth", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-startDepth" value={quantumCore.startDepth} min={0.01} max={10} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "startDepth", v)} isRTL={isRTL} />

            <ControlSlider label={t("traceFactor")} value={quantumCore.traceFactor} min={0.001} max={1} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "traceFactor", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-traceFactor" value={quantumCore.traceFactor} min={0.001} max={1} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "traceFactor", v)} isRTL={isRTL} />

            <ControlSlider label={t("primaryPeriod")} value={quantumCore.primaryPeriod} min={0.1} max={40} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "primaryPeriod", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-primaryPeriod" value={quantumCore.primaryPeriod} min={0.1} max={40} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "primaryPeriod", v)} isRTL={isRTL} />

            <ControlSlider label={t("primaryOffset")} value={quantumCore.primaryOffset} min={-20} max={20} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "primaryOffset", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-primaryOffset" value={quantumCore.primaryOffset} min={-20} max={20} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "primaryOffset", v)} isRTL={isRTL} />

            <ControlSlider label={t("secondaryPeriod")} value={quantumCore.secondaryPeriod} min={0.1} max={30} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "secondaryPeriod", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-secondaryPeriod" value={quantumCore.secondaryPeriod} min={0.1} max={30} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "secondaryPeriod", v)} isRTL={isRTL} />

            <ControlSlider label={t("secondaryOffset")} value={quantumCore.secondaryOffset} min={-15} max={15} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "secondaryOffset", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-secondaryOffset" value={quantumCore.secondaryOffset} min={-15} max={15} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "secondaryOffset", v)} isRTL={isRTL} />

            <ControlSlider label={t("detailScale")} value={quantumCore.detailScale} min={0.1} max={60} step={0.1} onValueChange={(v) => updateShaderConfig("quantumCore", "detailScale", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-detailScale" value={quantumCore.detailScale} min={0.1} max={60} step={0.1} onValueChange={(v) => updateShaderConfig("quantumCore", "detailScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("detailAmount")} value={quantumCore.detailAmount} min={0.05} max={6} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "detailAmount", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-detailAmount" value={quantumCore.detailAmount} min={0.05} max={6} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "detailAmount", v)} isRTL={isRTL} />

            <ControlSlider label={t("verticalOffset")} value={quantumCore.verticalOffset} min={-30} max={30} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "verticalOffset", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-verticalOffset" value={quantumCore.verticalOffset} min={-30} max={30} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "verticalOffset", v)} isRTL={isRTL} />

            <ControlSlider label={t("angularPeriod")} value={quantumCore.angularPeriod} min={0.05} max={2} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "angularPeriod", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-angularPeriod" value={quantumCore.angularPeriod} min={0.05} max={2} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "angularPeriod", v)} isRTL={isRTL} />

            <ControlSlider label={t("angularHalfPeriod")} value={quantumCore.angularHalfPeriod} min={0} max={1} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "angularHalfPeriod", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-angularHalfPeriod" value={quantumCore.angularHalfPeriod} min={0} max={1} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "angularHalfPeriod", v)} isRTL={isRTL} />

            <ControlSlider label={t("mirrorPhaseX")} value={quantumCore.mirrorPhaseX} min={-3.2} max={3.2} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "mirrorPhaseX", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-mirrorPhaseX" value={quantumCore.mirrorPhaseX} min={-3.2} max={3.2} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "mirrorPhaseX", v)} isRTL={isRTL} />

            <ControlSlider label={t("mirrorPhaseY")} value={quantumCore.mirrorPhaseY} min={-3.2} max={3.2} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "mirrorPhaseY", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-mirrorPhaseY" value={quantumCore.mirrorPhaseY} min={-3.2} max={3.2} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "mirrorPhaseY", v)} isRTL={isRTL} />

            <ControlSlider label={t("mirrorPhaseZ")} value={quantumCore.mirrorPhaseZ} min={-3.2} max={3.2} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "mirrorPhaseZ", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-mirrorPhaseZ" value={quantumCore.mirrorPhaseZ} min={-3.2} max={3.2} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "mirrorPhaseZ", v)} isRTL={isRTL} />

            <ControlSlider label={t("spectralPhaseR")} value={quantumCore.spectralPhaseR} min={-6.283} max={6.283} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "spectralPhaseR", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-spectralPhaseR" value={quantumCore.spectralPhaseR} min={-6.283} max={6.283} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "spectralPhaseR", v)} isRTL={isRTL} />

            <ControlSlider label={t("spectralPhaseG")} value={quantumCore.spectralPhaseG} min={-6.283} max={6.283} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "spectralPhaseG", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-spectralPhaseG" value={quantumCore.spectralPhaseG} min={-6.283} max={6.283} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "spectralPhaseG", v)} isRTL={isRTL} />

            <ControlSlider label={t("spectralPhaseB")} value={quantumCore.spectralPhaseB} min={-6.283} max={6.283} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "spectralPhaseB", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-spectralPhaseB" value={quantumCore.spectralPhaseB} min={-6.283} max={6.283} step={0.001} onValueChange={(v) => updateShaderConfig("quantumCore", "spectralPhaseB", v)} isRTL={isRTL} />

            <ControlSlider label={t("lightIntensity")} value={quantumCore.lightIntensity} min={0} max={10} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "lightIntensity", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-lightIntensity" value={quantumCore.lightIntensity} min={0} max={10} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "lightIntensity", v)} isRTL={isRTL} />

            <ControlSlider label={t("outputScale")} value={quantumCore.outputScale} min={50} max={3000} step={1} onValueChange={(v) => updateShaderConfig("quantumCore", "outputScale", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-outputScale" value={quantumCore.outputScale} min={50} max={3000} step={1} onValueChange={(v) => updateShaderConfig("quantumCore", "outputScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("precision")} value={quantumCore.traceSteps} min={1} max={128} step={1} onValueChange={(v) => updateShaderConfig("quantumCore", "traceSteps", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-traceSteps" value={quantumCore.traceSteps} min={1} max={128} step={1} onValueChange={(v) => updateShaderConfig("quantumCore", "traceSteps", v)} isRTL={isRTL} />

            <ControlSlider label={t("foldSteps")} value={quantumCore.foldSteps} min={0} max={8} step={1} onValueChange={(v) => updateShaderConfig("quantumCore", "foldSteps", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-foldSteps" value={quantumCore.foldSteps} min={0} max={8} step={1} onValueChange={(v) => updateShaderConfig("quantumCore", "foldSteps", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={quantumCore.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("quantumCore", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-hue" value={quantumCore.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("quantumCore", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={quantumCore.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="quantumCore-saturation" value={quantumCore.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("quantumCore", "saturation", v)} isRTL={isRTL} />

            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("lightColor")}</span>
              <ColorPicker value={quantumCore.colorLight} onValueChange={(c) => updateShaderConfig("quantumCore", "colorLight", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>
          </>
        )}
        
        {renderShaderControls(
          "neonKaleidoscope",
          neonKaleidoscope,
          <>
            <ControlSlider label={t("speed")} value={neonKaleidoscope.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="neonKaleidoscope-speed" value={neonKaleidoscope.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("renderScale")} value={neonKaleidoscope.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="neonKaleidoscope-renderScale" value={neonKaleidoscope.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("iterations")} value={neonKaleidoscope.iterationCount} min={1} max={12} step={1} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "iterationCount", v)} isRTL={isRTL} />
            <CustomSlider id="neonKaleidoscope-iterationCount" value={neonKaleidoscope.iterationCount} min={1} max={12} step={1} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "iterationCount", v)} isRTL={isRTL} />

            <ControlSlider label={t("cellScale")} value={neonKaleidoscope.cellScale} min={0.5} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "cellScale", v)} isRTL={isRTL} />
            <CustomSlider id="neonKaleidoscope-cellScale" value={neonKaleidoscope.cellScale} min={0.5} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "cellScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("formRadius")} value={neonKaleidoscope.formRadius} min={0.1} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "formRadius", v)} isRTL={isRTL} />
            <CustomSlider id="neonKaleidoscope-formRadius" value={neonKaleidoscope.formRadius} min={0.1} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "formRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("formAngularity")} value={neonKaleidoscope.formAngularity} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "formAngularity", v)} isRTL={isRTL} />
            <CustomSlider id="neonKaleidoscope-formAngularity" value={neonKaleidoscope.formAngularity} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "formAngularity", v)} isRTL={isRTL} />

            <ControlSlider label={t("cornerWeight")} value={neonKaleidoscope.cornerWeight} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "cornerWeight", v)} isRTL={isRTL} />
            <CustomSlider id="neonKaleidoscope-cornerWeight" value={neonKaleidoscope.cornerWeight} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "cornerWeight", v)} isRTL={isRTL} />

            <ControlSlider label={t("facetCount")} value={neonKaleidoscope.facetCount} min={3} max={56} step={1} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "facetCount", v)} isRTL={isRTL} />
            <CustomSlider id="neonKaleidoscope-facetCount" value={neonKaleidoscope.facetCount} min={3} max={56} step={1} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "facetCount", v)} isRTL={isRTL} />

            <ControlSlider label={t("facetSmoothness")} value={neonKaleidoscope.facetSmoothness} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "facetSmoothness", v)} isRTL={isRTL} />
            <CustomSlider id="neonKaleidoscope-facetSmoothness" value={neonKaleidoscope.facetSmoothness} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "facetSmoothness", v)} isRTL={isRTL} />

            <ControlSlider label={t("facetSpin")} value={neonKaleidoscope.facetSpin} min={-1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "facetSpin", v)} isRTL={isRTL} />
            <CustomSlider id="neonKaleidoscope-facetSpin" value={neonKaleidoscope.facetSpin} min={-1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "facetSpin", v)} isRTL={isRTL} />

            <ControlSlider label={t("phaseRate")} value={neonKaleidoscope.phaseRate} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "phaseRate", v)} isRTL={isRTL} />
            <CustomSlider id="neonKaleidoscope-phaseRate" value={neonKaleidoscope.phaseRate} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "phaseRate", v)} isRTL={isRTL} />

            <ControlSlider label={t("layerShift")} value={neonKaleidoscope.layerShift} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "layerShift", v)} isRTL={isRTL} />
            <CustomSlider id="neonKaleidoscope-layerShift" value={neonKaleidoscope.layerShift} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "layerShift", v)} isRTL={isRTL} />

            <ControlSlider label={t("bandFrequency")} value={neonKaleidoscope.bandFrequency} min={1} max={60} step={0.1} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "bandFrequency", v)} isRTL={isRTL} />
            <CustomSlider id="neonKaleidoscope-bandFrequency" value={neonKaleidoscope.bandFrequency} min={1} max={60} step={0.1} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "bandFrequency", v)} isRTL={isRTL} />

            <ControlSlider label={t("bandDivisor")} value={neonKaleidoscope.bandDivisor} min={0.5} max={15} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "bandDivisor", v)} isRTL={isRTL} />
            <CustomSlider id="neonKaleidoscope-bandDivisor" value={neonKaleidoscope.bandDivisor} min={0.5} max={15} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "bandDivisor", v)} isRTL={isRTL} />

            <ControlSlider label={t("lightWidth")} value={neonKaleidoscope.lightWidth} min={0.001} max={0.1} step={0.001} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "lightWidth", v)} isRTL={isRTL} />
            <CustomSlider id="neonKaleidoscope-lightWidth" value={neonKaleidoscope.lightWidth} min={0.001} max={0.1} step={0.001} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "lightWidth", v)} isRTL={isRTL} />

            <ControlSlider label={t("power")} value={neonKaleidoscope.lightPower} min={0.1} max={4} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "lightPower", v)} isRTL={isRTL} />
            <CustomSlider id="neonKaleidoscope-lightPower" value={neonKaleidoscope.lightPower} min={0.1} max={4} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "lightPower", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={neonKaleidoscope.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="neonKaleidoscope-hue" value={neonKaleidoscope.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={neonKaleidoscope.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="neonKaleidoscope-saturation" value={neonKaleidoscope.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("neonKaleidoscope", "saturation", v)} isRTL={isRTL} />

            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("baseColor")}</span>
              <ColorPicker 
                value={neonKaleidoscope.baseColor} 
                onValueChange={(c) => updateShaderConfig("neonKaleidoscope", "baseColor", hsvaToHex(c))} 
                hideAlpha 
                hideContrastRatio 
              />
            </div>
          </>
        )}

        {renderShaderControls(
          "sparkTunnel",
          sparkTunnel,
          <>
            <ControlSlider label={t("speed")} value={sparkTunnel.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-speed" value={sparkTunnel.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("renderScale")} value={sparkTunnel.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-renderScale" value={sparkTunnel.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("facetCount")} value={sparkTunnel.facetCount} min={3} max={24} step={1} onValueChange={(v) => updateShaderConfig("sparkTunnel", "facetCount", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-facetCount" value={sparkTunnel.facetCount} min={3} max={24} step={1} onValueChange={(v) => updateShaderConfig("sparkTunnel", "facetCount", v)} isRTL={isRTL} />

            <ControlSlider label={t("tunnelRadius")} value={sparkTunnel.tunnelRadius} min={0.3} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("sparkTunnel", "tunnelRadius", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-tunnelRadius" value={sparkTunnel.tunnelRadius} min={0.3} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("sparkTunnel", "tunnelRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("bounces")} value={sparkTunnel.bounces} min={1} max={8} step={1} onValueChange={(v) => updateShaderConfig("sparkTunnel", "bounces", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-bounces" value={sparkTunnel.bounces} min={1} max={8} step={1} onValueChange={(v) => updateShaderConfig("sparkTunnel", "bounces", v)} isRTL={isRTL} />

            <ControlSlider label={t("alphaFalloff")} value={sparkTunnel.alphaFalloff} min={0.1} max={0.95} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "alphaFalloff", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-alphaFalloff" value={sparkTunnel.alphaFalloff} min={0.1} max={0.95} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "alphaFalloff", v)} isRTL={isRTL} />

            <ControlSlider label={t("gridScale")} value={sparkTunnel.gridScale} min={1} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("sparkTunnel", "gridScale", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-gridScale" value={sparkTunnel.gridScale} min={1} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("sparkTunnel", "gridScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("densityThreshold")} value={sparkTunnel.densityThreshold} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "densityThreshold", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-densityThreshold" value={sparkTunnel.densityThreshold} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "densityThreshold", v)} isRTL={isRTL} />

            <ControlSlider label={t("sphereMinRadius")} value={sparkTunnel.sphereMinRadius} min={0.01} max={0.5} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "sphereMinRadius", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-sphereMinRadius" value={sparkTunnel.sphereMinRadius} min={0.01} max={0.5} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "sphereMinRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("sphereMaxRadius")} value={sparkTunnel.sphereMaxRadius} min={0.05} max={0.6} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "sphereMaxRadius", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-sphereMaxRadius" value={sparkTunnel.sphereMaxRadius} min={0.05} max={0.6} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "sphereMaxRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("glowIntensity")} value={sparkTunnel.glowIntensity} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "glowIntensity", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-glowIntensity" value={sparkTunnel.glowIntensity} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "glowIntensity", v)} isRTL={isRTL} />

            <ControlSlider label={t("glowFalloff")} value={sparkTunnel.glowFalloff} min={1} max={40} step={0.5} onValueChange={(v) => updateShaderConfig("sparkTunnel", "glowFalloff", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-glowFalloff" value={sparkTunnel.glowFalloff} min={1} max={40} step={0.5} onValueChange={(v) => updateShaderConfig("sparkTunnel", "glowFalloff", v)} isRTL={isRTL} />

            <ControlSlider label={t("brightnessMultiplier")} value={sparkTunnel.brightnessMultiplier} min={0.5} max={12} step={0.1} onValueChange={(v) => updateShaderConfig("sparkTunnel", "brightnessMultiplier", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-brightnessMultiplier" value={sparkTunnel.brightnessMultiplier} min={0.5} max={12} step={0.1} onValueChange={(v) => updateShaderConfig("sparkTunnel", "brightnessMultiplier", v)} isRTL={isRTL} />

            <ControlSlider label={t("fogDensity")} value={sparkTunnel.fogStrength} min={0} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("sparkTunnel", "fogStrength", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-fogStrength" value={sparkTunnel.fogStrength} min={0} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("sparkTunnel", "fogStrength", v)} isRTL={isRTL} />

            <ControlSlider label={t("fogFalloff")} value={sparkTunnel.fogFalloff} min={0.1} max={10} step={0.05} onValueChange={(v) => updateShaderConfig("sparkTunnel", "fogFalloff", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-fogFalloff" value={sparkTunnel.fogFalloff} min={0.1} max={10} step={0.05} onValueChange={(v) => updateShaderConfig("sparkTunnel", "fogFalloff", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorPhaseScale")} value={sparkTunnel.colorPaletteScale} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "colorPaletteScale", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-colorPaletteScale" value={sparkTunnel.colorPaletteScale} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "colorPaletteScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("offset")} value={sparkTunnel.colorPaletteOffset} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "colorPaletteOffset", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-colorPaletteOffset" value={sparkTunnel.colorPaletteOffset} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "colorPaletteOffset", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={sparkTunnel.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("sparkTunnel", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-hue" value={sparkTunnel.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("sparkTunnel", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={sparkTunnel.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-saturation" value={sparkTunnel.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("sparkTunnel", "saturation", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorCount")} value={sparkTunnel.colorCount} min={1} max={9} step={1} onValueChange={(v) => updateShaderConfig("sparkTunnel", "colorCount", v)} isRTL={isRTL} />
            <CustomSlider id="sparkTunnel-colorCount" value={sparkTunnel.colorCount} min={1} max={9} step={1} onValueChange={(v) => updateShaderConfig("sparkTunnel", "colorCount", v)} isRTL={isRTL} />

            {sparkTunnel.colors.slice(0, sparkTunnel.colorCount).map((color, index) => (
              <div key={index} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">{t("color")} {index + 1}</span>
                <ColorPicker value={color} onValueChange={(c) => {
                  const updated = [...sparkTunnel.colors];
                  updated[index] = hsvaToHex(c);
                  updateShaderConfig("sparkTunnel", "colors", updated);
                }} hideAlpha hideContrastRatio />
              </div>
            ))}
          </>
        )}

        {renderShaderControls(
          "whirlpool",
          whirlpool,
          <>
            <ControlSlider label={t("speed")} value={whirlpool.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("whirlpool", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="whirlpool-speed" value={whirlpool.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("whirlpool", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("renderScale")} value={whirlpool.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("whirlpool", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="whirlpool-renderScale" value={whirlpool.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("whirlpool", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("spiralFrequency")} value={whirlpool.spiralSpeed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("whirlpool", "spiralSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="whirlpool-spiralSpeed" value={whirlpool.spiralSpeed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("whirlpool", "spiralSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("precision")} value={whirlpool.marchSteps} min={20} max={220} step={1} onValueChange={(v) => updateShaderConfig("whirlpool", "marchSteps", v)} isRTL={isRTL} />
            <CustomSlider id="whirlpool-marchSteps" value={whirlpool.marchSteps} min={20} max={220} step={1} onValueChange={(v) => updateShaderConfig("whirlpool", "marchSteps", v)} isRTL={isRTL} />

            <ControlSlider label={t("seriesStart")} value={whirlpool.seriesStart} min={1} max={20} step={0.5} onValueChange={(v) => updateShaderConfig("whirlpool", "seriesStart", v)} isRTL={isRTL} />
            <CustomSlider id="whirlpool-seriesStart" value={whirlpool.seriesStart} min={1} max={20} step={0.5} onValueChange={(v) => updateShaderConfig("whirlpool", "seriesStart", v)} isRTL={isRTL} />

            <ControlSlider label={t("seriesMax")} value={whirlpool.seriesMax} min={20} max={400} step={1} onValueChange={(v) => updateShaderConfig("whirlpool", "seriesMax", v)} isRTL={isRTL} />
            <CustomSlider id="whirlpool-seriesMax" value={whirlpool.seriesMax} min={20} max={400} step={1} onValueChange={(v) => updateShaderConfig("whirlpool", "seriesMax", v)} isRTL={isRTL} />

            <ControlSlider label={t("stepScale")} value={whirlpool.stepScale} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("whirlpool", "stepScale", v)} isRTL={isRTL} />
            <CustomSlider id="whirlpool-stepScale" value={whirlpool.stepScale} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("whirlpool", "stepScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("densityScale")} value={whirlpool.densityExponent} min={50} max={800} step={5} onValueChange={(v) => updateShaderConfig("whirlpool", "densityExponent", v)} isRTL={isRTL} />
            <CustomSlider id="whirlpool-densityExponent" value={whirlpool.densityExponent} min={50} max={800} step={5} onValueChange={(v) => updateShaderConfig("whirlpool", "densityExponent", v)} isRTL={isRTL} />

            <ControlSlider label={t("density")} value={whirlpool.densityScale} min={0.005} max={0.1} step={0.001} onValueChange={(v) => updateShaderConfig("whirlpool", "densityScale", v)} isRTL={isRTL} />
            <CustomSlider id="whirlpool-densityScale" value={whirlpool.densityScale} min={0.005} max={0.1} step={0.001} onValueChange={(v) => updateShaderConfig("whirlpool", "densityScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("intensity")} value={whirlpool.colorIntensity} min={0.001} max={0.1} step={0.001} onValueChange={(v) => updateShaderConfig("whirlpool", "colorIntensity", v)} isRTL={isRTL} />
            <CustomSlider id="whirlpool-colorIntensity" value={whirlpool.colorIntensity} min={0.001} max={0.1} step={0.001} onValueChange={(v) => updateShaderConfig("whirlpool", "colorIntensity", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraOffsetX")} value={whirlpool.cameraOffsetX} min={-1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("whirlpool", "cameraOffsetX", v)} isRTL={isRTL} />
            <CustomSlider id="whirlpool-cameraOffsetX" value={whirlpool.cameraOffsetX} min={-1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("whirlpool", "cameraOffsetX", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraOffsetY")} value={whirlpool.cameraOffsetY} min={-3} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("whirlpool", "cameraOffsetY", v)} isRTL={isRTL} />
            <CustomSlider id="whirlpool-cameraOffsetY" value={whirlpool.cameraOffsetY} min={-3} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("whirlpool", "cameraOffsetY", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={whirlpool.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("whirlpool", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="whirlpool-hue" value={whirlpool.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("whirlpool", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={whirlpool.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("whirlpool", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="whirlpool-saturation" value={whirlpool.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("whirlpool", "saturation", v)} isRTL={isRTL} />

            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("color")}</span>
              <ColorPicker value={whirlpool.colorTint} onValueChange={(c) => updateShaderConfig("whirlpool", "colorTint", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>
          </>
        )}

        {renderShaderControls(
          "containerFlow",
          containerFlow,
          <>
            <ControlSlider label={t("speed")} value={containerFlow.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("containerFlow", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="containerFlow-speed" value={containerFlow.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("containerFlow", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("renderScale")} value={containerFlow.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("containerFlow", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="containerFlow-renderScale" value={containerFlow.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("containerFlow", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraSpeed")} value={containerFlow.cameraForwardSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("containerFlow", "cameraForwardSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="containerFlow-cameraForwardSpeed" value={containerFlow.cameraForwardSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("containerFlow", "cameraForwardSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathAmpX")} value={containerFlow.pathSwayAmpX} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("containerFlow", "pathSwayAmpX", v)} isRTL={isRTL} />
            <CustomSlider id="containerFlow-pathSwayAmpX" value={containerFlow.pathSwayAmpX} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("containerFlow", "pathSwayAmpX", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathAmpY")} value={containerFlow.pathSwayAmpY} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("containerFlow", "pathSwayAmpY", v)} isRTL={isRTL} />
            <CustomSlider id="containerFlow-pathSwayAmpY" value={containerFlow.pathSwayAmpY} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("containerFlow", "pathSwayAmpY", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathFreqX")} value={containerFlow.pathSwayFreq} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("containerFlow", "pathSwayFreq", v)} isRTL={isRTL} />
            <CustomSlider id="containerFlow-pathSwayFreq" value={containerFlow.pathSwayFreq} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("containerFlow", "pathSwayFreq", v)} isRTL={isRTL} />

            <ControlSlider label={t("twist")} value={containerFlow.rotationSpeed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("containerFlow", "rotationSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="containerFlow-rotationSpeed" value={containerFlow.rotationSpeed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("containerFlow", "rotationSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("latticeThickness")} value={containerFlow.latticeThickness} min={0.01} max={0.3} step={0.005} onValueChange={(v) => updateShaderConfig("containerFlow", "latticeThickness", v)} isRTL={isRTL} />
            <CustomSlider id="containerFlow-latticeThickness" value={containerFlow.latticeThickness} min={0.01} max={0.3} step={0.005} onValueChange={(v) => updateShaderConfig("containerFlow", "latticeThickness", v)} isRTL={isRTL} />

            <ControlSlider label={t("voxelResolution")} value={containerFlow.voxelResolution} min={5} max={80} step={1} onValueChange={(v) => updateShaderConfig("containerFlow", "voxelResolution", v)} isRTL={isRTL} />
            <CustomSlider id="containerFlow-voxelResolution" value={containerFlow.voxelResolution} min={5} max={80} step={1} onValueChange={(v) => updateShaderConfig("containerFlow", "voxelResolution", v)} isRTL={isRTL} />

            <ControlSlider label={t("precision")} value={containerFlow.marchSteps} min={20} max={150} step={1} onValueChange={(v) => updateShaderConfig("containerFlow", "marchSteps", v)} isRTL={isRTL} />
            <CustomSlider id="containerFlow-marchSteps" value={containerFlow.marchSteps} min={20} max={150} step={1} onValueChange={(v) => updateShaderConfig("containerFlow", "marchSteps", v)} isRTL={isRTL} />

            <ControlSlider label={t("stepScale")} value={containerFlow.stepScale} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("containerFlow", "stepScale", v)} isRTL={isRTL} />
            <CustomSlider id="containerFlow-stepScale" value={containerFlow.stepScale} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("containerFlow", "stepScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorPlaneScale")} value={containerFlow.colorZFreq} min={0} max={8} step={0.05} onValueChange={(v) => updateShaderConfig("containerFlow", "colorZFreq", v)} isRTL={isRTL} />
            <CustomSlider id="containerFlow-colorZFreq" value={containerFlow.colorZFreq} min={0} max={8} step={0.05} onValueChange={(v) => updateShaderConfig("containerFlow", "colorZFreq", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorShiftSpeed")} value={containerFlow.colorTimeSpeed} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("containerFlow", "colorTimeSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="containerFlow-colorTimeSpeed" value={containerFlow.colorTimeSpeed} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("containerFlow", "colorTimeSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("density")} value={containerFlow.densityScale} min={0.5} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("containerFlow", "densityScale", v)} isRTL={isRTL} />
            <CustomSlider id="containerFlow-densityScale" value={containerFlow.densityScale} min={0.5} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("containerFlow", "densityScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("glowIntensity")} value={containerFlow.densityBoost} min={0.05} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("containerFlow", "densityBoost", v)} isRTL={isRTL} />
            <CustomSlider id="containerFlow-densityBoost" value={containerFlow.densityBoost} min={0.05} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("containerFlow", "densityBoost", v)} isRTL={isRTL} />

            <ControlSlider label={t("exposure")} value={containerFlow.toneMapDivisor} min={500} max={30000} step={100} onValueChange={(v) => updateShaderConfig("containerFlow", "toneMapDivisor", v)} isRTL={isRTL} />
            <CustomSlider id="containerFlow-toneMapDivisor" value={containerFlow.toneMapDivisor} min={500} max={30000} step={100} onValueChange={(v) => updateShaderConfig("containerFlow", "toneMapDivisor", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={containerFlow.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("containerFlow", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="containerFlow-hue" value={containerFlow.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("containerFlow", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={containerFlow.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("containerFlow", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="containerFlow-saturation" value={containerFlow.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("containerFlow", "saturation", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorCount")} value={containerFlow.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("containerFlow", "colorCount", v)} isRTL={isRTL} />
            <CustomSlider id="containerFlow-colorCount" value={containerFlow.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("containerFlow", "colorCount", v)} isRTL={isRTL} />

            {containerFlow.colors.slice(0, containerFlow.colorCount).map((color, index) => (
              <div key={index} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">{t("color")} {index + 1}</span>
                <ColorPicker value={color} onValueChange={(c) => {
                  const updated = [...containerFlow.colors];
                  updated[index] = hsvaToHex(c);
                  updateShaderConfig("containerFlow", "colors", updated);
                }} hideAlpha hideContrastRatio />
              </div>
            ))}
          </>
        )}

        {renderShaderControls(
          "mandelbrot",
          mandelbrot,
          <>
            <ControlSlider label={t("speed")} value={mandelbrot.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("mandelbrot", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="mandelbrot-speed" value={mandelbrot.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("mandelbrot", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("renderScale")} value={mandelbrot.renderScale} min={0.1} max={1} step={0.05} onValueChange={(v) => updateShaderConfig("mandelbrot", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="mandelbrot-renderScale" value={mandelbrot.renderScale} min={0.1} max={1} step={0.05} onValueChange={(v) => updateShaderConfig("mandelbrot", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("zoomSpeed")} value={mandelbrot.zoomSpeed} min={0} max={0.05} step={0.0005} onValueChange={(v) => updateShaderConfig("mandelbrot", "zoomSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="mandelbrot-zoomSpeed" value={mandelbrot.zoomSpeed} min={0} max={0.05} step={0.0005} onValueChange={(v) => updateShaderConfig("mandelbrot", "zoomSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("zoomBase")} value={mandelbrot.zoomBase} min={0.00001} max={0.05} step={0.00001} onValueChange={(v) => updateShaderConfig("mandelbrot", "zoomBase", v)} isRTL={isRTL} />
            <CustomSlider id="mandelbrot-zoomBase" value={mandelbrot.zoomBase} min={0.00001} max={0.05} step={0.00001} onValueChange={(v) => updateShaderConfig("mandelbrot", "zoomBase", v)} isRTL={isRTL} />

            <ControlSlider label={t("zoomAmplitude")} value={mandelbrot.zoomAmplitude} min={0} max={0.05} step={0.0005} onValueChange={(v) => updateShaderConfig("mandelbrot", "zoomAmplitude", v)} isRTL={isRTL} />
            <CustomSlider id="mandelbrot-zoomAmplitude" value={mandelbrot.zoomAmplitude} min={0} max={0.05} step={0.0005} onValueChange={(v) => updateShaderConfig("mandelbrot", "zoomAmplitude", v)} isRTL={isRTL} />

            <ControlSlider label={t("zoomCenterX")} value={mandelbrot.zoomCenterX} min={-2} max={1} step={0.001} onValueChange={(v) => updateShaderConfig("mandelbrot", "zoomCenterX", v)} isRTL={isRTL} />
            <CustomSlider id="mandelbrot-zoomCenterX" value={mandelbrot.zoomCenterX} min={-2} max={1} step={0.001} onValueChange={(v) => updateShaderConfig("mandelbrot", "zoomCenterX", v)} isRTL={isRTL} />

            <ControlSlider label={t("zoomCenterY")} value={mandelbrot.zoomCenterY} min={-1.5} max={1.5} step={0.001} onValueChange={(v) => updateShaderConfig("mandelbrot", "zoomCenterY", v)} isRTL={isRTL} />
            <CustomSlider id="mandelbrot-zoomCenterY" value={mandelbrot.zoomCenterY} min={-1.5} max={1.5} step={0.001} onValueChange={(v) => updateShaderConfig("mandelbrot", "zoomCenterY", v)} isRTL={isRTL} />

            <ControlSlider label={t("rotationSpeed")} value={mandelbrot.rotationSpeed} min={0} max={0.3} step={0.001} onValueChange={(v) => updateShaderConfig("mandelbrot", "rotationSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="mandelbrot-rotationSpeed" value={mandelbrot.rotationSpeed} min={0} max={0.3} step={0.001} onValueChange={(v) => updateShaderConfig("mandelbrot", "rotationSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("precision")} value={mandelbrot.maxIterations} min={16} max={1024} step={1} onValueChange={(v) => updateShaderConfig("mandelbrot", "maxIterations", v)} isRTL={isRTL} />
            <CustomSlider id="mandelbrot-maxIterations" value={mandelbrot.maxIterations} min={16} max={1024} step={1} onValueChange={(v) => updateShaderConfig("mandelbrot", "maxIterations", v)} isRTL={isRTL} />

            <ControlSlider label={t("escapeRadius")} value={mandelbrot.escapeRadius} min={2} max={1000} step={1} onValueChange={(v) => updateShaderConfig("mandelbrot", "escapeRadius", v)} isRTL={isRTL} />
            <CustomSlider id="mandelbrot-escapeRadius" value={mandelbrot.escapeRadius} min={2} max={1000} step={1} onValueChange={(v) => updateShaderConfig("mandelbrot", "escapeRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("waveFreqA")} value={mandelbrot.waveFreqA} min={0} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("mandelbrot", "waveFreqA", v)} isRTL={isRTL} />
            <CustomSlider id="mandelbrot-waveFreqA" value={mandelbrot.waveFreqA} min={0} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("mandelbrot", "waveFreqA", v)} isRTL={isRTL} />

            <ControlSlider label={t("waveFreqB")} value={mandelbrot.waveFreqB} min={0} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("mandelbrot", "waveFreqB", v)} isRTL={isRTL} />
            <CustomSlider id="mandelbrot-waveFreqB" value={mandelbrot.waveFreqB} min={0} max={20} step={0.1} onValueChange={(v) => updateShaderConfig("mandelbrot", "waveFreqB", v)} isRTL={isRTL} />

            <ControlSlider label={t("waveTimeSpeedA")} value={mandelbrot.waveTimeSpeedA} min={0} max={1} step={0.005} onValueChange={(v) => updateShaderConfig("mandelbrot", "waveTimeSpeedA", v)} isRTL={isRTL} />
            <CustomSlider id="mandelbrot-waveTimeSpeedA" value={mandelbrot.waveTimeSpeedA} min={0} max={1} step={0.005} onValueChange={(v) => updateShaderConfig("mandelbrot", "waveTimeSpeedA", v)} isRTL={isRTL} />

            <ControlSlider label={t("waveTimeSpeedB")} value={mandelbrot.waveTimeSpeedB} min={0} max={1} step={0.005} onValueChange={(v) => updateShaderConfig("mandelbrot", "waveTimeSpeedB", v)} isRTL={isRTL} />
            <CustomSlider id="mandelbrot-waveTimeSpeedB" value={mandelbrot.waveTimeSpeedB} min={0} max={1} step={0.005} onValueChange={(v) => updateShaderConfig("mandelbrot", "waveTimeSpeedB", v)} isRTL={isRTL} />

            <ControlSlider label={t("waveSharpness")} value={mandelbrot.waveSharpness} min={1} max={800} step={1} onValueChange={(v) => updateShaderConfig("mandelbrot", "waveSharpness", v)} isRTL={isRTL} />
            <CustomSlider id="mandelbrot-waveSharpness" value={mandelbrot.waveSharpness} min={1} max={800} step={1} onValueChange={(v) => updateShaderConfig("mandelbrot", "waveSharpness", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={mandelbrot.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("mandelbrot", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="mandelbrot-hue" value={mandelbrot.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("mandelbrot", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={mandelbrot.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("mandelbrot", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="mandelbrot-saturation" value={mandelbrot.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("mandelbrot", "saturation", v)} isRTL={isRTL} />

            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("firstColor")}</span>
              <ColorPicker value={mandelbrot.firstColor} onValueChange={(c) => updateShaderConfig("mandelbrot", "firstColor", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("secondColor")}</span>
              <ColorPicker value={mandelbrot.secondColor} onValueChange={(c) => updateShaderConfig("mandelbrot", "secondColor", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>
          </>
        )}

        {renderShaderControls(
          "neuralGlass",
          neuralGlass,
          <>
            <ControlSlider label={t("cameraSpeed")} value={neuralGlass.cameraSpeed} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "cameraSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-cameraSpeed" value={neuralGlass.cameraSpeed} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "cameraSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("renderScale")} value={neuralGlass.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-renderScale" value={neuralGlass.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathAmpY")} value={neuralGlass.pathAmpY} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "pathAmpY", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-pathAmpY" value={neuralGlass.pathAmpY} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "pathAmpY", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathFreqX")} value={neuralGlass.pathFreqX} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "pathFreqX", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-pathFreqX" value={neuralGlass.pathFreqX} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "pathFreqX", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathFreqZ")} value={neuralGlass.pathFreqZ} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "pathFreqZ", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-pathFreqZ" value={neuralGlass.pathFreqZ} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "pathFreqZ", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathTimeFreq")} value={neuralGlass.pathTimeFreq} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "pathTimeFreq", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-pathTimeFreq" value={neuralGlass.pathTimeFreq} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "pathTimeFreq", v)} isRTL={isRTL} />

            <ControlSlider label={t("rot3Base")} value={neuralGlass.rot3Base} min={-3.14} max={3.14} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "rot3Base", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-rot3Base" value={neuralGlass.rot3Base} min={-3.14} max={3.14} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "rot3Base", v)} isRTL={isRTL} />

            <ControlSlider label={t("rot3Offset")} value={neuralGlass.rot3Offset} min={-3.14} max={3.14} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "rot3Offset", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-rot3Offset" value={neuralGlass.rot3Offset} min={-3.14} max={3.14} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "rot3Offset", v)} isRTL={isRTL} />

            <ControlSlider label={t("rot4Base")} value={neuralGlass.rot4Base} min={-3.14} max={3.14} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "rot4Base", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-rot4Base" value={neuralGlass.rot4Base} min={-3.14} max={3.14} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "rot4Base", v)} isRTL={isRTL} />

            <ControlSlider label={t("rot4Offset")} value={neuralGlass.rot4Offset} min={-3.14} max={3.14} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "rot4Offset", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-rot4Offset" value={neuralGlass.rot4Offset} min={-3.14} max={3.14} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "rot4Offset", v)} isRTL={isRTL} />

            <ControlSlider label={t("offset2X")} value={neuralGlass.offset2X} min={-4} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("neuralGlass", "offset2X", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-offset2X" value={neuralGlass.offset2X} min={-4} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("neuralGlass", "offset2X", v)} isRTL={isRTL} />

            <ControlSlider label={t("offset2Y")} value={neuralGlass.offset2Y} min={-4} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("neuralGlass", "offset2Y", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-offset2Y" value={neuralGlass.offset2Y} min={-4} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("neuralGlass", "offset2Y", v)} isRTL={isRTL} />

            <ControlSlider label={t("offset2Z")} value={neuralGlass.offset2Z} min={-4} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("neuralGlass", "offset2Z", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-offset2Z" value={neuralGlass.offset2Z} min={-4} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("neuralGlass", "offset2Z", v)} isRTL={isRTL} />

            <ControlSlider label={t("cellSizeX")} value={neuralGlass.cellSizeX} min={1} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("neuralGlass", "cellSizeX", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-cellSizeX" value={neuralGlass.cellSizeX} min={1} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("neuralGlass", "cellSizeX", v)} isRTL={isRTL} />

            <ControlSlider label={t("cellSizeY")} value={neuralGlass.cellSizeY} min={1} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("neuralGlass", "cellSizeY", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-cellSizeY" value={neuralGlass.cellSizeY} min={1} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("neuralGlass", "cellSizeY", v)} isRTL={isRTL} />

            <ControlSlider label={t("cellSizeZ")} value={neuralGlass.cellSizeZ} min={1} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("neuralGlass", "cellSizeZ", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-cellSizeZ" value={neuralGlass.cellSizeZ} min={1} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("neuralGlass", "cellSizeZ", v)} isRTL={isRTL} />

            <ControlSlider label={t("cell2X")} value={neuralGlass.cell2X} min={1} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("neuralGlass", "cell2X", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-cell2X" value={neuralGlass.cell2X} min={1} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("neuralGlass", "cell2X", v)} isRTL={isRTL} />

            <ControlSlider label={t("cell2Y")} value={neuralGlass.cell2Y} min={1} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("neuralGlass", "cell2Y", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-cell2Y" value={neuralGlass.cell2Y} min={1} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("neuralGlass", "cell2Y", v)} isRTL={isRTL} />

            <ControlSlider label={t("cell2Z")} value={neuralGlass.cell2Z} min={1} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("neuralGlass", "cell2Z", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-cell2Z" value={neuralGlass.cell2Z} min={1} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("neuralGlass", "cell2Z", v)} isRTL={isRTL} />

            <ControlSlider label={t("cylinderThickness")} value={neuralGlass.thickness1} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("neuralGlass", "thickness1", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-thickness1" value={neuralGlass.thickness1} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("neuralGlass", "thickness1", v)} isRTL={isRTL} />

            <ControlSlider label={t("thickness2")} value={neuralGlass.thickness2} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("neuralGlass", "thickness2", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-thickness2" value={neuralGlass.thickness2} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("neuralGlass", "thickness2", v)} isRTL={isRTL} />

            <ControlSlider label={t("thickness3")} value={neuralGlass.thickness3} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("neuralGlass", "thickness3", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-thickness3" value={neuralGlass.thickness3} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("neuralGlass", "thickness3", v)} isRTL={isRTL} />

            <ControlSlider label={t("softness")} value={neuralGlass.blendSmooth1} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("neuralGlass", "blendSmooth1", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-blendSmooth1" value={neuralGlass.blendSmooth1} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("neuralGlass", "blendSmooth1", v)} isRTL={isRTL} />

            <ControlSlider label={t("blendSmooth2")} value={neuralGlass.blendSmooth2} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("neuralGlass", "blendSmooth2", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-blendSmooth2" value={neuralGlass.blendSmooth2} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("neuralGlass", "blendSmooth2", v)} isRTL={isRTL} />

            <ControlSlider label={t("lightSpeed")} value={neuralGlass.lightSpeed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "lightSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-lightSpeed" value={neuralGlass.lightSpeed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "lightSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("power")} value={neuralGlass.specPower} min={1} max={200} step={1} onValueChange={(v) => updateShaderConfig("neuralGlass", "specPower", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-specPower" value={neuralGlass.specPower} min={1} max={200} step={1} onValueChange={(v) => updateShaderConfig("neuralGlass", "specPower", v)} isRTL={isRTL} />

            <ControlSlider label={t("glassFade")} value={neuralGlass.glassFade} min={0.01} max={1} step={0.005} onValueChange={(v) => updateShaderConfig("neuralGlass", "glassFade", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-glassFade" value={neuralGlass.glassFade} min={0.01} max={1} step={0.005} onValueChange={(v) => updateShaderConfig("neuralGlass", "glassFade", v)} isRTL={isRTL} />

            <ControlSlider label={t("ior")} value={neuralGlass.ior} min={0.3} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "ior", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-ior" value={neuralGlass.ior} min={0.3} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "ior", v)} isRTL={isRTL} />

            <ControlSlider label={t("volPower")} value={neuralGlass.volPower} min={0.1} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "volPower", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-volPower" value={neuralGlass.volPower} min={0.1} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "volPower", v)} isRTL={isRTL} />

            <ControlSlider label={t("volScale")} value={neuralGlass.volScale} min={0.0001} max={0.01} step={0.0001} onValueChange={(v) => updateShaderConfig("neuralGlass", "volScale", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-volScale" value={neuralGlass.volScale} min={0.0001} max={0.01} step={0.0001} onValueChange={(v) => updateShaderConfig("neuralGlass", "volScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("fogDensity")} value={neuralGlass.fogDensity} min={0} max={0.05} step={0.0005} onValueChange={(v) => updateShaderConfig("neuralGlass", "fogDensity", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-fogDensity" value={neuralGlass.fogDensity} min={0} max={0.05} step={0.0005} onValueChange={(v) => updateShaderConfig("neuralGlass", "fogDensity", v)} isRTL={isRTL} />

            <ControlSlider label={t("precision")} value={neuralGlass.marchSteps} min={10} max={80} step={1} onValueChange={(v) => updateShaderConfig("neuralGlass", "marchSteps", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-marchSteps" value={neuralGlass.marchSteps} min={10} max={80} step={1} onValueChange={(v) => updateShaderConfig("neuralGlass", "marchSteps", v)} isRTL={isRTL} />

            <ControlSlider label={t("fieldOfView")} value={neuralGlass.fov} min={0.5} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("neuralGlass", "fov", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-fov" value={neuralGlass.fov} min={0.5} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("neuralGlass", "fov", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraPosX")} value={neuralGlass.cameraPosX} min={-10} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("neuralGlass", "cameraPosX", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-cameraPosX" value={neuralGlass.cameraPosX} min={-10} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("neuralGlass", "cameraPosX", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraPosY")} value={neuralGlass.cameraPosY} min={-10} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("neuralGlass", "cameraPosY", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-cameraPosY" value={neuralGlass.cameraPosY} min={-10} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("neuralGlass", "cameraPosY", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraPosZ")} value={neuralGlass.cameraPosZ} min={-10} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("neuralGlass", "cameraPosZ", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-cameraPosZ" value={neuralGlass.cameraPosZ} min={-10} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("neuralGlass", "cameraPosZ", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={neuralGlass.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("neuralGlass", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-hue" value={neuralGlass.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("neuralGlass", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={neuralGlass.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-saturation" value={neuralGlass.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("neuralGlass", "saturation", v)} isRTL={isRTL} />

            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("lightcol1")}</span>
              <ColorPicker value={neuralGlass.colorLightcol1} onValueChange={(c) => updateShaderConfig("neuralGlass", "colorLightcol1", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("lightcol2")}</span>
              <ColorPicker value={neuralGlass.colorLightcol2} onValueChange={(c) => updateShaderConfig("neuralGlass", "colorLightcol2", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>

            <ControlSlider label={t("colorCount")} value={neuralGlass.colorCount} min={1} max={4} step={1} onValueChange={(v) => updateShaderConfig("neuralGlass", "colorCount", v)} isRTL={isRTL} />
            <CustomSlider id="neuralGlass-colorCount" value={neuralGlass.colorCount} min={1} max={4} step={1} onValueChange={(v) => updateShaderConfig("neuralGlass", "colorCount", v)} isRTL={isRTL} />

            {neuralGlass.colors.slice(0, neuralGlass.colorCount).map((color, index) => (
              <div key={index} className="flex flex-col gap-1 my-2">
                <span className="text-sm font-medium">{t("color")} {index + 1}</span>
                <ColorPicker value={color} onValueChange={(c) => {
                  const updated = [...neuralGlass.colors];
                  updated[index] = hsvaToHex(c);
                  updateShaderConfig("neuralGlass", "colors", updated);
                }} hideAlpha hideContrastRatio />
              </div>
            ))}
          </>
        )}

        {renderShaderControls(
          "blobbyWorld",
          blobbyWorld,
          <>
            <ControlSlider label={t("speed")} value={blobbyWorld.speed} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-speed" value={blobbyWorld.speed} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("renderScale")} value={blobbyWorld.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-renderScale" value={blobbyWorld.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("cellSize")} value={blobbyWorld.cellSize} min={2} max={20} step={0.5} onValueChange={(v) => updateShaderConfig("blobbyWorld", "cellSize", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-cellSize" value={blobbyWorld.cellSize} min={2} max={20} step={0.5} onValueChange={(v) => updateShaderConfig("blobbyWorld", "cellSize", v)} isRTL={isRTL} />

            <ControlSlider label={t("rotSpeedA")} value={blobbyWorld.rotSpeedA} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "rotSpeedA", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-rotSpeedA" value={blobbyWorld.rotSpeedA} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "rotSpeedA", v)} isRTL={isRTL} />

            <ControlSlider label={t("rotZInfluence")} value={blobbyWorld.rotZInfluence} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "rotZInfluence", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-rotZInfluence" value={blobbyWorld.rotZInfluence} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "rotZInfluence", v)} isRTL={isRTL} />

            <ControlSlider label={t("rotSpeedB")} value={blobbyWorld.rotSpeedB} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "rotSpeedB", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-rotSpeedB" value={blobbyWorld.rotSpeedB} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "rotSpeedB", v)} isRTL={isRTL} />

            <ControlSlider label={t("blobRadius")} value={blobbyWorld.blobRadius} min={0.2} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "blobRadius", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-blobRadius" value={blobbyWorld.blobRadius} min={0.2} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "blobRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("fluidFreq")} value={blobbyWorld.fluidFreq} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "fluidFreq", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-fluidFreq" value={blobbyWorld.fluidFreq} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "fluidFreq", v)} isRTL={isRTL} />

            <ControlSlider label={t("fluidTimeX")} value={blobbyWorld.fluidTimeX} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "fluidTimeX", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-fluidTimeX" value={blobbyWorld.fluidTimeX} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "fluidTimeX", v)} isRTL={isRTL} />

            <ControlSlider label={t("fluidTimeY")} value={blobbyWorld.fluidTimeY} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "fluidTimeY", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-fluidTimeY" value={blobbyWorld.fluidTimeY} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "fluidTimeY", v)} isRTL={isRTL} />

            <ControlSlider label={t("fluidTimeZ")} value={blobbyWorld.fluidTimeZ} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "fluidTimeZ", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-fluidTimeZ" value={blobbyWorld.fluidTimeZ} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "fluidTimeZ", v)} isRTL={isRTL} />

            <ControlSlider label={t("fluidAmount")} value={blobbyWorld.fluidAmount} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "fluidAmount", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-fluidAmount" value={blobbyWorld.fluidAmount} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "fluidAmount", v)} isRTL={isRTL} />

            <ControlSlider label={t("fieldScale")} value={blobbyWorld.fieldScale} min={0.1} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "fieldScale", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-fieldScale" value={blobbyWorld.fieldScale} min={0.1} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "fieldScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraDistX")} value={blobbyWorld.cameraDistX} min={0} max={15} step={0.1} onValueChange={(v) => updateShaderConfig("blobbyWorld", "cameraDistX", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-cameraDistX" value={blobbyWorld.cameraDistX} min={0} max={15} step={0.1} onValueChange={(v) => updateShaderConfig("blobbyWorld", "cameraDistX", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraDistY")} value={blobbyWorld.cameraDistY} min={0} max={15} step={0.1} onValueChange={(v) => updateShaderConfig("blobbyWorld", "cameraDistY", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-cameraDistY" value={blobbyWorld.cameraDistY} min={0} max={15} step={0.1} onValueChange={(v) => updateShaderConfig("blobbyWorld", "cameraDistY", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraSwayAmpX")} value={blobbyWorld.cameraSwayAmpX} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "cameraSwayAmpX", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-cameraSwayAmpX" value={blobbyWorld.cameraSwayAmpX} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "cameraSwayAmpX", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraSwayAmpY")} value={blobbyWorld.cameraSwayAmpY} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "cameraSwayAmpY", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-cameraSwayAmpY" value={blobbyWorld.cameraSwayAmpY} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "cameraSwayAmpY", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraSwayFreqX")} value={blobbyWorld.cameraSwayFreqX} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "cameraSwayFreqX", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-cameraSwayFreqX" value={blobbyWorld.cameraSwayFreqX} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "cameraSwayFreqX", v)} isRTL={isRTL} />

            <ControlSlider label={t("cameraSwayFreqY")} value={blobbyWorld.cameraSwayFreqY} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "cameraSwayFreqY", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-cameraSwayFreqY" value={blobbyWorld.cameraSwayFreqY} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "cameraSwayFreqY", v)} isRTL={isRTL} />

            <ControlSlider label={t("rayRotAmpA")} value={blobbyWorld.rayRotAmpA} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "rayRotAmpA", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-rayRotAmpA" value={blobbyWorld.rayRotAmpA} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "rayRotAmpA", v)} isRTL={isRTL} />

            <ControlSlider label={t("rayRotFreqA")} value={blobbyWorld.rayRotFreqA} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "rayRotFreqA", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-rayRotFreqA" value={blobbyWorld.rayRotFreqA} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "rayRotFreqA", v)} isRTL={isRTL} />

            <ControlSlider label={t("rayRotAmpB")} value={blobbyWorld.rayRotAmpB} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "rayRotAmpB", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-rayRotAmpB" value={blobbyWorld.rayRotAmpB} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "rayRotAmpB", v)} isRTL={isRTL} />

            <ControlSlider label={t("rayRotFreqB")} value={blobbyWorld.rayRotFreqB} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "rayRotFreqB", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-rayRotFreqB" value={blobbyWorld.rayRotFreqB} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "rayRotFreqB", v)} isRTL={isRTL} />

            <ControlSlider label={t("glowIntensity")} value={blobbyWorld.glowNumerator} min={0.001} max={0.05} step={0.001} onValueChange={(v) => updateShaderConfig("blobbyWorld", "glowNumerator", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-glowNumerator" value={blobbyWorld.glowNumerator} min={0.001} max={0.05} step={0.001} onValueChange={(v) => updateShaderConfig("blobbyWorld", "glowNumerator", v)} isRTL={isRTL} />

            <ControlSlider label={t("glowEpsilon")} value={blobbyWorld.glowEpsilon} min={0.001} max={0.2} step={0.001} onValueChange={(v) => updateShaderConfig("blobbyWorld", "glowEpsilon", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-glowEpsilon" value={blobbyWorld.glowEpsilon} min={0.001} max={0.2} step={0.001} onValueChange={(v) => updateShaderConfig("blobbyWorld", "glowEpsilon", v)} isRTL={isRTL} />

            <ControlSlider label={t("precision")} value={blobbyWorld.maxSteps} min={20} max={200} step={1} onValueChange={(v) => updateShaderConfig("blobbyWorld", "maxSteps", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-maxSteps" value={blobbyWorld.maxSteps} min={20} max={200} step={1} onValueChange={(v) => updateShaderConfig("blobbyWorld", "maxSteps", v)} isRTL={isRTL} />

            <ControlSlider label={t("distance")} value={blobbyWorld.maxDist} min={10} max={150} step={1} onValueChange={(v) => updateShaderConfig("blobbyWorld", "maxDist", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-maxDist" value={blobbyWorld.maxDist} min={10} max={150} step={1} onValueChange={(v) => updateShaderConfig("blobbyWorld", "maxDist", v)} isRTL={isRTL} />

            <ControlSlider label={t("surfDist")} value={blobbyWorld.surfDist} min={0.001} max={0.05} step={0.001} onValueChange={(v) => updateShaderConfig("blobbyWorld", "surfDist", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-surfDist" value={blobbyWorld.surfDist} min={0.001} max={0.05} step={0.001} onValueChange={(v) => updateShaderConfig("blobbyWorld", "surfDist", v)} isRTL={isRTL} />

            <ControlSlider label={t("intensity")} value={blobbyWorld.colorIntensity} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("blobbyWorld", "colorIntensity", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-colorIntensity" value={blobbyWorld.colorIntensity} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("blobbyWorld", "colorIntensity", v)} isRTL={isRTL} />

            <ControlSlider label={t("oscTimeFreq1")} value={blobbyWorld.oscTimeFreq1} min={-3} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "oscTimeFreq1", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-oscTimeFreq1" value={blobbyWorld.oscTimeFreq1} min={-3} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "oscTimeFreq1", v)} isRTL={isRTL} />

            <ControlSlider label={t("oscDistFreq1")} value={blobbyWorld.oscDistFreq1} min={-2} max={2} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "oscDistFreq1", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-oscDistFreq1" value={blobbyWorld.oscDistFreq1} min={-2} max={2} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "oscDistFreq1", v)} isRTL={isRTL} />

            <ControlSlider label={t("oscPhase1")} value={blobbyWorld.oscPhase1} min={-6.28} max={6.28} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "oscPhase1", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-oscPhase1" value={blobbyWorld.oscPhase1} min={-6.28} max={6.28} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "oscPhase1", v)} isRTL={isRTL} />

            <ControlSlider label={t("oscTimeFreq2")} value={blobbyWorld.oscTimeFreq2} min={-3} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "oscTimeFreq2", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-oscTimeFreq2" value={blobbyWorld.oscTimeFreq2} min={-3} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "oscTimeFreq2", v)} isRTL={isRTL} />

            <ControlSlider label={t("oscDistFreq2")} value={blobbyWorld.oscDistFreq2} min={-2} max={2} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "oscDistFreq2", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-oscDistFreq2" value={blobbyWorld.oscDistFreq2} min={-2} max={2} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "oscDistFreq2", v)} isRTL={isRTL} />

            <ControlSlider label={t("oscPhase2")} value={blobbyWorld.oscPhase2} min={-6.28} max={6.28} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "oscPhase2", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-oscPhase2" value={blobbyWorld.oscPhase2} min={-6.28} max={6.28} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "oscPhase2", v)} isRTL={isRTL} />

            <ControlSlider label={t("oscTimeFreq3")} value={blobbyWorld.oscTimeFreq3} min={-3} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "oscTimeFreq3", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-oscTimeFreq3" value={blobbyWorld.oscTimeFreq3} min={-3} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "oscTimeFreq3", v)} isRTL={isRTL} />

            <ControlSlider label={t("oscDistFreq3")} value={blobbyWorld.oscDistFreq3} min={-2} max={2} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "oscDistFreq3", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-oscDistFreq3" value={blobbyWorld.oscDistFreq3} min={-2} max={2} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "oscDistFreq3", v)} isRTL={isRTL} />

            <ControlSlider label={t("oscPhase3")} value={blobbyWorld.oscPhase3} min={-6.28} max={6.28} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "oscPhase3", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-oscPhase3" value={blobbyWorld.oscPhase3} min={-6.28} max={6.28} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "oscPhase3", v)} isRTL={isRTL} />

            <ControlSlider label={t("fogDensity")} value={blobbyWorld.fogDensity} min={0} max={0.2} step={0.001} onValueChange={(v) => updateShaderConfig("blobbyWorld", "fogDensity", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-fogDensity" value={blobbyWorld.fogDensity} min={0} max={0.2} step={0.001} onValueChange={(v) => updateShaderConfig("blobbyWorld", "fogDensity", v)} isRTL={isRTL} />

            <ControlSlider label={t("exposure")} value={blobbyWorld.exposure} min={0.1} max={4} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "exposure", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-exposure" value={blobbyWorld.exposure} min={0.1} max={4} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "exposure", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturationBoost")} value={blobbyWorld.saturationBoost} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "saturationBoost", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-saturationBoost" value={blobbyWorld.saturationBoost} min={0} max={3} step={0.05} onValueChange={(v) => updateShaderConfig("blobbyWorld", "saturationBoost", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={blobbyWorld.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("blobbyWorld", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-hue" value={blobbyWorld.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("blobbyWorld", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={blobbyWorld.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="blobbyWorld-saturation" value={blobbyWorld.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("blobbyWorld", "saturation", v)} isRTL={isRTL} />

            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("color")} 1</span>
              <ColorPicker value={blobbyWorld.firstColor} onValueChange={(c) => updateShaderConfig("blobbyWorld", "firstColor", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("color")} 2</span>
              <ColorPicker value={blobbyWorld.secondColor} onValueChange={(c) => updateShaderConfig("blobbyWorld", "secondColor", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>
            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("color")} 3</span>
              <ColorPicker value={blobbyWorld.thirdColor} onValueChange={(c) => updateShaderConfig("blobbyWorld", "thirdColor", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>
          </>
        )}

        {renderShaderControls(
          "spaceThreads",
          spaceThreads,
          <>
            <ControlSlider label={t("speed")} value={spaceThreads.speed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("spaceThreads", "speed", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-speed" value={spaceThreads.speed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("spaceThreads", "speed", v)} isRTL={isRTL} />

            <ControlSlider label={t("renderScale")} value={spaceThreads.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("spaceThreads", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-renderScale" value={spaceThreads.renderScale} min={0.1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("spaceThreads", "renderScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathFreqY")} value={spaceThreads.pathFreqY} min={0} max={8} step={0.05} onValueChange={(v) => updateShaderConfig("spaceThreads", "pathFreqY", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-pathFreqY" value={spaceThreads.pathFreqY} min={0} max={8} step={0.05} onValueChange={(v) => updateShaderConfig("spaceThreads", "pathFreqY", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathTimeY")} value={spaceThreads.pathTimeY} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("spaceThreads", "pathTimeY", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-pathTimeY" value={spaceThreads.pathTimeY} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("spaceThreads", "pathTimeY", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathAmpY")} value={spaceThreads.pathAmpY} min={0} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("spaceThreads", "pathAmpY", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-pathAmpY" value={spaceThreads.pathAmpY} min={0} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("spaceThreads", "pathAmpY", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathFreqX")} value={spaceThreads.pathFreqX} min={0} max={8} step={0.05} onValueChange={(v) => updateShaderConfig("spaceThreads", "pathFreqX", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-pathFreqX" value={spaceThreads.pathFreqX} min={0} max={8} step={0.05} onValueChange={(v) => updateShaderConfig("spaceThreads", "pathFreqX", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathTimeX")} value={spaceThreads.pathTimeX} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("spaceThreads", "pathTimeX", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-pathTimeX" value={spaceThreads.pathTimeX} min={0} max={5} step={0.05} onValueChange={(v) => updateShaderConfig("spaceThreads", "pathTimeX", v)} isRTL={isRTL} />

            <ControlSlider label={t("pathAmpX")} value={spaceThreads.pathAmpX} min={0} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("spaceThreads", "pathAmpX", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-pathAmpX" value={spaceThreads.pathAmpX} min={0} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("spaceThreads", "pathAmpX", v)} isRTL={isRTL} />

            <ControlSlider label={t("cellSize")} value={spaceThreads.cellSize} min={0.5} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("spaceThreads", "cellSize", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-cellSize" value={spaceThreads.cellSize} min={0.5} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("spaceThreads", "cellSize", v)} isRTL={isRTL} />

            <ControlSlider label={t("threadThickness")} value={spaceThreads.threadThickness} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("spaceThreads", "threadThickness", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-threadThickness" value={spaceThreads.threadThickness} min={0.01} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("spaceThreads", "threadThickness", v)} isRTL={isRTL} />

            <ControlSlider label={t("gridSize")} value={spaceThreads.voxelResolution} min={5} max={80} step={1} onValueChange={(v) => updateShaderConfig("spaceThreads", "voxelResolution", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-voxelResolution" value={spaceThreads.voxelResolution} min={5} max={80} step={1} onValueChange={(v) => updateShaderConfig("spaceThreads", "voxelResolution", v)} isRTL={isRTL} />

            <ControlSlider label={t("precision")} value={spaceThreads.marchSteps} min={10} max={120} step={1} onValueChange={(v) => updateShaderConfig("spaceThreads", "marchSteps", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-marchSteps" value={spaceThreads.marchSteps} min={10} max={120} step={1} onValueChange={(v) => updateShaderConfig("spaceThreads", "marchSteps", v)} isRTL={isRTL} />

            <ControlSlider label={t("stepScale")} value={spaceThreads.stepScale} min={0.05} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("spaceThreads", "stepScale", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-stepScale" value={spaceThreads.stepScale} min={0.05} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("spaceThreads", "stepScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("reflectCellSize")} value={spaceThreads.reflectCellSize} min={0.5} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("spaceThreads", "reflectCellSize", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-reflectCellSize" value={spaceThreads.reflectCellSize} min={0.5} max={6} step={0.05} onValueChange={(v) => updateShaderConfig("spaceThreads", "reflectCellSize", v)} isRTL={isRTL} />

            <ControlSlider label={t("cylinderRadius")} value={spaceThreads.cylinderRadius} min={0.01} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("spaceThreads", "cylinderRadius", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-cylinderRadius" value={spaceThreads.cylinderRadius} min={0.01} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("spaceThreads", "cylinderRadius", v)} isRTL={isRTL} />

            <ControlSlider label={t("cylinderEpsilon")} value={spaceThreads.cylinderEpsilon} min={0.001} max={0.2} step={0.001} onValueChange={(v) => updateShaderConfig("spaceThreads", "cylinderEpsilon", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-cylinderEpsilon" value={spaceThreads.cylinderEpsilon} min={0.001} max={0.2} step={0.001} onValueChange={(v) => updateShaderConfig("spaceThreads", "cylinderEpsilon", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorFreqScale")} value={spaceThreads.colorFreqScale} min={0} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("spaceThreads", "colorFreqScale", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-colorFreqScale" value={spaceThreads.colorFreqScale} min={0} max={10} step={0.1} onValueChange={(v) => updateShaderConfig("spaceThreads", "colorFreqScale", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorShiftSpeed")} value={spaceThreads.colorTimeSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("spaceThreads", "colorTimeSpeed", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-colorTimeSpeed" value={spaceThreads.colorTimeSpeed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("spaceThreads", "colorTimeSpeed", v)} isRTL={isRTL} />

            <ControlSlider label={t("colorFloor")} value={spaceThreads.colorFloor} min={0.005} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("spaceThreads", "colorFloor", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-colorFloor" value={spaceThreads.colorFloor} min={0.005} max={0.5} step={0.005} onValueChange={(v) => updateShaderConfig("spaceThreads", "colorFloor", v)} isRTL={isRTL} />

            <ControlSlider label={t("phaseG")} value={spaceThreads.phaseG} min={-6.28} max={6.28} step={0.05} onValueChange={(v) => updateShaderConfig("spaceThreads", "phaseG", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-phaseG" value={spaceThreads.phaseG} min={-6.28} max={6.28} step={0.05} onValueChange={(v) => updateShaderConfig("spaceThreads", "phaseG", v)} isRTL={isRTL} />

            <ControlSlider label={t("phaseB")} value={spaceThreads.phaseB} min={-6.28} max={6.28} step={0.05} onValueChange={(v) => updateShaderConfig("spaceThreads", "phaseB", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-phaseB" value={spaceThreads.phaseB} min={-6.28} max={6.28} step={0.05} onValueChange={(v) => updateShaderConfig("spaceThreads", "phaseB", v)} isRTL={isRTL} />

            <ControlSlider label={t("exposure")} value={spaceThreads.toneMapDivisor} min={200} max={20000} step={50} onValueChange={(v) => updateShaderConfig("spaceThreads", "toneMapDivisor", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-toneMapDivisor" value={spaceThreads.toneMapDivisor} min={200} max={20000} step={50} onValueChange={(v) => updateShaderConfig("spaceThreads", "toneMapDivisor", v)} isRTL={isRTL} />

            <ControlSlider label={t("fieldOfView")} value={spaceThreads.fov} min={0.5} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("spaceThreads", "fov", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-fov" value={spaceThreads.fov} min={0.5} max={4} step={0.05} onValueChange={(v) => updateShaderConfig("spaceThreads", "fov", v)} isRTL={isRTL} />

            <ControlSlider label={t("hue")} value={spaceThreads.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("spaceThreads", "hue", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-hue" value={spaceThreads.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("spaceThreads", "hue", v)} isRTL={isRTL} />

            <ControlSlider label={t("saturation")} value={spaceThreads.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("spaceThreads", "saturation", v)} isRTL={isRTL} />
            <CustomSlider id="spaceThreads-saturation" value={spaceThreads.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("spaceThreads", "saturation", v)} isRTL={isRTL} />

            <div className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">{t("baseColor")}</span>
              <ColorPicker value={spaceThreads.colorTint} onValueChange={(c) => updateShaderConfig("spaceThreads", "colorTint", hsvaToHex(c))} hideAlpha hideContrastRatio />
            </div>
          </>
        )}
      </Accordion>
    </div>
  );
}

function ControlSlider({
  label,
  value,
  onValueChange,
  min,
  max,
  step,
  isRTL,
  unit = "",
}: {
  label: string;
  value: number;
  onValueChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  isRTL: boolean;
  unit?: string;
}) {
  return (
    <div className="space-y-2">
      <div
        className="flex justify-between"
        style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
      >
        <Label style={{ textAlign: isRTL ? "right" : "left" }}>{label}</Label>
        <span className="text-sm text-muted-foreground">
          {value.toFixed(step < 1 ? (step < 0.01 ? 3 : 2) : 0)}
          {unit}
        </span>
      </div>
    </div>
  );
}