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
    <div className="space-y-4 m-6">
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
            <ControlSlider label={t("renderScale")} value={trickyShapes.renderScale} min={0.1} max={1.0} step={0.05} onValueChange={(v) => updateShaderConfig("trickyShapes", "renderScale", v)} isRTL={isRTL} />
            <CustomSlider id="trickyShapes-renderScale" value={trickyShapes.renderScale} min={0.1} max={1.0} step={0.05} onValueChange={(v) => updateShaderConfig("trickyShapes", "renderScale", v)} isRTL={isRTL} />
              
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