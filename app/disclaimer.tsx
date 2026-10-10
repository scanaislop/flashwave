import { useState } from "react";
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { saveDisclaimerAcceptance } from '@/utils/storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlowButton from '@/components/shared/GlowButton';
import NeonContainer from '@/components/shared/NeonContainer';
import { AlertTriangle } from 'lucide-react-native';
import { fonts } from '@/constants/fonts';

export default function DisclaimerScreen() {
    const { returnTo } = useLocalSearchParams();
    const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

    const handleScroll = (event: any) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20;
        const isCloseToBottom = layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;

        if (isCloseToBottom && !hasScrolledToBottom) {
            setHasScrolledToBottom(true);
        }
    };

    const handleAccept = async () => {
        // Save disclaimer acceptance
        await saveDisclaimerAcceptance();

        // Navigate to the appropriate screen
        if (returnTo) {
            // Handle return path based on known valid routes
            if (returnTo === '/(tabs)') {
                router.replace('/(tabs)');
            } else if (returnTo === '/settings') {
                router.replace('/(tabs)/settings');
            } else {
                // Default fallback
                router.replace('/(tabs)');
            }
        } else {
            router.replace('/(tabs)');
        }
    };

    return (
        <LinearGradient colors={['#0A0A0F', '#1A1A2E']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <AlertTriangle size={32} color="#F59E0B" />
                    <Text style={styles.title}>IMPORTANT DISCLAIMER</Text>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                >
                    <NeonContainer glowColor="#F59E0B" variant="strong" style={styles.disclaimerContainer}>
                        <Text style={styles.warningText}>
                            WARNING: PHOTOSENSITIVITY / SEIZURE ADVISORY
                        </Text>

                        <Text style={styles.disclaimerText}>
                            This application contains flashing lights and patterns that may trigger seizures in people with photosensitive epilepsy or other photosensitivities.
                        </Text>

                        <Text style={styles.disclaimerText}>
                            A very small percentage of individuals may experience epileptic seizures or blackouts when exposed to certain light patterns or flashing lights. Exposure to certain patterns or backgrounds on a screen, or to strobe effects while using this application, may trigger epileptic seizures or blackouts in these individuals.
                        </Text>

                        <Text style={styles.disclaimerText}>
                            These conditions may trigger previously undetected epileptic symptoms or seizures in persons who have no history of prior seizures or epilepsy. If you, or anyone in your family, have an epileptic condition or have had seizures of any kind, consult your physician before using this application.
                        </Text>

                        <Text style={styles.disclaimerText}>
                            IMMEDIATELY STOP use and consult a doctor if you experience any of the following symptoms while using this application:
                            • Lightheadedness
                            • Altered vision
                            • Eye or muscle twitches
                            • Loss of awareness
                            • Disorientation
                            • Any involuntary movement
                            • Convulsions
                        </Text>

                        <Text style={styles.disclaimerText}>
                            PARENTS SHOULD MONITOR their children&apos;s use of this application. If you or your child experience any of the symptoms listed above, IMMEDIATELY STOP using this application and consult a doctor.
                        </Text>

                        <Text style={styles.disclaimerText}>
                            By continuing to use this application, you acknowledge that you have read this warning and assume all risks associated with its use.
                        </Text>

                        <Text style={styles.disclaimerText}>
                            FlashWave is intended for entertainment purposes only and should be used responsibly.
                        </Text>

                        <View style={styles.spacer} />

                    </NeonContainer>
                </ScrollView>

                <View style={styles.footer}>
                    <GlowButton
                        title="I Understand and Accept"
                        onPress={handleAccept}
                        size="large"
                        style={styles.acceptButton}
                        disabled={!hasScrolledToBottom}
                    />
                    {!hasScrolledToBottom && (
                        <Text style={styles.scrollPrompt}>
                            Please read the entire disclaimer before continuing
                        </Text>
                    )}
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    title: {
        fontFamily: fonts.bold,
        fontSize: 24,
        color: '#F59E0B',
        textAlign: 'center',
    },
    disclaimerContainer: {
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 20,
    },
    scrollView: {
        flex: 1,
        // padding: 20,
    },
    warningText: {
        fontFamily: fonts.bold,
        fontSize: 18,
        color: '#F59E0B',
        marginBottom: 20,
        textAlign: 'center',
    },
    disclaimerText: {
        fontFamily: fonts.medium,
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 20,
        lineHeight: 24,
    },
    footer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    acceptButton: {
        width: '100%',
    },
    scrollPrompt: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: '#F59E0B',
        marginTop: 10,
        textAlign: 'center',
    },
    spacer: {
        height: 40,
    },
});
