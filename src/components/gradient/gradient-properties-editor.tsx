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
