import React, { useRef, useState } from "react";
import { ActivityIndicator, Linking, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { Attraction, Destination } from "../data/models";
import { useLanguage } from "../i18n/LanguageProvider";
import { partnerConfiguration } from "../partners/config";
import { openPartnerLink, resolvePartnerLinks } from "../partners/links";
import type { PartnerLink } from "../partners/types";
import { colors, s } from "./ui";

export function PartnerPlanning({ destination, attraction }: { destination: Destination; attraction?: Attraction }) {
  const { t, language } = useLanguage();
  const [selected, setSelected] = useState<PartnerLink | null>(null);
  const [busy, setBusy] = useState(false);
  const opening = useRef(false);
  const [error, setError] = useState(false);
  const links = resolvePartnerLinks(destination, attraction, language);
  const providerName = (link: PartnerLink) => partnerConfiguration.providers.find((p) => p.id === link.providerId)?.name ?? "";
  const close = () => { if (!opening.current) setSelected(null); };
  const open = async () => {
    if (!selected || opening.current) return;
    opening.current = true;
    setBusy(true);
    const result = await openPartnerLink(selected, { destination, attraction, language }, Linking);
    setBusy(false);
    opening.current = false;
    setSelected(null);
    setError(result !== "opened");
  };
  return (
    <View>
      <Text accessibilityRole="header" style={s.section}>{t(attraction ? "partner.visitTitle" : "partner.tripTitle")}</Text>
      <Text style={s.body}>{t("partner.externalNote")}</Text>
      {!links.length && <Text style={s.body}>{t("partner.empty")}</Text>}
      {links.map((link) => (
        <Pressable
          key={`${link.providerId}:${link.action}`}
          accessibilityRole="link"
          accessibilityLabel={`${t(link.labelKey)} · ${providerName(link)} · ${t(link.affiliate ? "partner.affiliateBadge" : "partner.externalBadge")}`}
          accessibilityHint={t("partner.confirmHint")}
          style={({ pressed }) => [styles.action, pressed && { opacity: 0.7 }]}
          onPress={() => { setError(false); setSelected(link); }}
        >
          <Text style={styles.label}>{t(link.labelKey)} ↗</Text>
          <Text style={styles.detail}>{providerName(link)} · {t(link.affiliate ? "partner.affiliateBadge" : "partner.externalBadge")}</Text>
          {(link.scope === "search" || link.scope === "area-search") && <Text style={styles.detail}>{t("partner.searchNote")}</Text>}
          {attraction && link.scope === "destination" && <Text style={styles.detail}>{t("partner.destinationScope")}</Text>}
          {link.affiliate && <Text style={styles.detail}>{t("partner.affiliateDisclosure")}</Text>}
        </Pressable>
      ))}
      <Text style={[s.body, { fontSize: 12, marginTop: 8 }]}>{t("partner.reviewPending")}</Text>
      {error && <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={styles.error}>{t("partner.openError")}</Text>}
      <Modal transparent visible={selected !== null} animationType="fade" onRequestClose={close}>
        <View style={styles.overlay}>
          <View accessibilityViewIsModal style={styles.dialog}>
            <ScrollView>
              <Text accessibilityRole="header" style={[s.section, { marginTop: 0 }]}>{t("partner.leavingTitle")}</Text>
              <Text style={s.body}>{t("partner.leavingBody", { provider: selected ? providerName(selected) : "" })}</Text>
              <Text selectable style={[s.body, { marginTop: 10 }]}>{selected ? new URL(selected.url).hostname : ""}</Text>
              {selected?.affiliate && <Text style={s.body}>{t("partner.affiliateDisclosure")}</Text>}
              <Text style={[s.body, { marginTop: 10 }]}>{t("partner.providerLanguage")}</Text>
              <Pressable accessibilityRole="button" accessibilityState={{ disabled: busy }} disabled={busy} style={s.button} onPress={() => void open()}>
                {busy ? <ActivityIndicator accessibilityLabel={t("partner.opening")} color="white" /> : <Text style={s.buttonText}>{t("partner.continue")}</Text>}
              </Pressable>
              <Pressable accessibilityRole="button" accessibilityState={{ disabled: busy }} disabled={busy} style={[s.button, { backgroundColor: "#E7EEE7" }]} onPress={close}>
                <Text style={[s.buttonText, { color: colors.ink }]}>{t("partner.cancel")}</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  action: { backgroundColor: "white", borderWidth: 1, borderColor: "#E4E8DF", borderRadius: 16, padding: 16, marginTop: 12, minHeight: 48 },
  label: { color: colors.green, fontSize: 15, fontWeight: "600" },
  detail: { color: colors.ink, fontSize: 12, lineHeight: 19, marginTop: 4 },
  error: { color: "#922E20", marginTop: 12, lineHeight: 22 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", padding: 24 },
  dialog: { backgroundColor: colors.paper, borderRadius: 24, padding: 24, maxHeight: "85%", width: "100%", maxWidth: 480, alignSelf: "center" },
});
