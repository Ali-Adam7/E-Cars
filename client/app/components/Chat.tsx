"use client";
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";

export default function Chat() {
  Kommunicate.init("3f2daeaad39650fc668cbde8db568e03e", {
    automaticChatOpenOnNavigation: true,
    popupWidget: true,
  });
  return <></>;
}
