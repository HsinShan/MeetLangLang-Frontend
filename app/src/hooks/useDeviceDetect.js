const DEVICE_SIZES_VALUE = {
    MOBILE: 640,
    TABLET: 920,
};

const useDeviceDetect = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth < DEVICE_SIZES_VALUE.MOBILE) return 'mobile';
    if (windowWidth < DEVICE_SIZES_VALUE.TABLET) return 'tablet';
    return 'desktop';
};

export default useDeviceDetect;
