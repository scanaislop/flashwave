export interface StrobeSettings {
    isStrobing: boolean;
    strobeSpeed: number;
    selectedColor: number;
    selectedEffect: number;
    sustainedMode: boolean;
    flashlightEnabled: boolean;
    screenBrightness: number;
}

export interface StrobeContextType extends StrobeSettings {
    setIsStrobing: (value: boolean) => void;
    setStrobeSpeed: (value: number) => void;
    setSelectedColor: (value: number) => void;
    setSelectedEffect: (value: number) => void;
    setShowControls: (value: boolean) => void;
    setSustainedMode: (value: boolean) => void;
    setFlashlightEnabled: (value: boolean) => void;
    setScreenBrightness: (value: number) => void;
    setOriginalBrightness: (value: number) => void;
    setTorchAvailable: (value: boolean) => void;
    setCurrentColorIndex: (value: number) => void;
    showControls: boolean;
    originalBrightness: number;
    torchAvailable: boolean;
    currentColorIndex: number;
    isInitialized: boolean;
}
