import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { AppProps } from "next/app";
import { getCookie, setCookies } from "cookies-next";
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  Slider,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { rtlCache } from "rtl-cache";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookies("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <>
      <div dir="rtl">
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{ colorScheme, dir: "rtl" }}
            withGlobalStyles
            withNormalizeCSS
            emotionCache={rtlCache}
          >
            <NotificationsProvider>
              <Component {...pageProps} />
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </div>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});
