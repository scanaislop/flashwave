import { StyleSheet } from 'react-native';

export const settingsStyles = StyleSheet.create({
    container: {
        flex: 1
    }, safeArea: {
        flex: 1
    }, header: {
        paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20
    }, title: {
        fontSize: 28, fontFamily: 'Orbitron-Bold', color: '#FFFFFF', letterSpacing: 1
    }, subtitle: {
        fontSize: 16, fontFamily: 'Rajdhani-Regular', color: '#94A3B8', marginTop: 4
    }, content: {
        flex: 1, paddingHorizontal: 20
    }, section: {
        marginBottom: 20
    }, sectionHeader: {
        flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16
    }, sectionTitle: {
        fontSize: 18, fontFamily: 'Rajdhani-Bold', color: '#FFFFFF', marginBottom: 16
    }, settingItem: {
        marginBottom: 20
    }, settingRow: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8
    }, settingLabel: {
        fontSize: 16, fontFamily: 'Rajdhani-Medium', color: '#FFFFFF'
    }, settingDescription: {
        fontSize: 12, fontFamily: 'Rajdhani-Regular', color: '#64748B', lineHeight: 16
    }, themeOptions: {
        flexDirection: 'row', gap: 8, marginTop: 12
    }, themeOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#1E293B',
        borderWidth: 1,
        borderColor: 'transparent'
    }, activeThemeOption: {
        borderColor: '#06FFA5', backgroundColor: '#06FFA520'
    }, themeOptionText: {
        fontSize: 12, fontFamily: 'Rajdhani-Medium', color: '#64748B'
    }, activeThemeOptionText: {
        color: '#06FFA5'
    }, modeOptions: {
        gap: 8, marginTop: 12
    }, modeOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#1E293B',
        borderWidth: 1,
        borderColor: 'transparent'
    }, activeModeOption: {
        borderColor: '#8B5CF6', backgroundColor: '#8B5CF620'
    }, modeOptionText: {
        fontSize: 14, fontFamily: 'Rajdhani-Medium', color: '#64748B'
    }, activeModeOptionText: {
        color: '#8B5CF6'
    }, slider: {
        height: 40, marginVertical: 8
    }, sliderLabels: {
        flexDirection: 'row', justifyContent: 'space-between'
    }, sliderLabel: {
        fontSize: 12, fontFamily: 'Rajdhani-Regular', color: '#64748B'
    }, supportItem: {
        flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 12
    }, supportText: {
        flex: 1
    }, supportTitle: {
        fontSize: 16, fontFamily: 'Rajdhani-Medium', color: '#FFFFFF', marginBottom: 2
    }, supportDescription: {
        fontSize: 12, fontFamily: 'Rajdhani-Regular', color: '#64748B'
    }, footer: {
        alignItems: 'center', paddingVertical: 30
    }, footerText: {
        fontSize: 14, fontFamily: 'Orbitron-Regular', color: '#06FFA5', letterSpacing: 1
    }, footerSubtext: {
        fontSize: 12, fontFamily: 'Rajdhani-Regular', color: '#64748B', marginTop: 4
    }
});
