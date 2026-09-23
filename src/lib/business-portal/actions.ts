"use server";

import { redirect } from "next/navigation";
import { portalFetch } from "@/lib/business-portal/client";
import {
  clearPortalSession,
  getPortalSession,
  setPortalSession,
  uniqueTrendsUsernames,
  UNIQUE_TRENDS_ID,
} from "@/lib/business-portal/session";

export type LoginState = { error?: string };

export async function loginBusiness(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  if (!uniqueTrendsUsernames().includes(email)) {
    return { error: "That username or password is not correct." };
  }
  const origin = (process.env.UNIQUE_TRENDS_ORIGIN || "").replace(/\/$/, "");
  const portalSecret = process.env.PORTAL_SECRET || "";
  if (!origin || portalSecret.length < 32) return { error: "Business sign-in is not ready yet." };
  let response: Response;
  try {
    response = await fetch(`${origin}/api/portal/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-portal-secret": portalSecret },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });
  } catch {
    return { error: "The shop could not be reached. Try again in a moment." };
  }
  const data = (await response.json().catch(() => null)) as {
    error?: string;
    token?: string;
    user?: { email: string; name: string };
    business?: { id: string };
  } | null;
  if (!response.ok || !data?.token || data.business?.id !== UNIQUE_TRENDS_ID || !data.user) {
    return { error: data?.error || "That username or password is not correct." };
  }
  await setPortalSession({
    email: data.user.email,
    name: data.user.name,
    businessId: UNIQUE_TRENDS_ID,
    token: data.token,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });
  redirect("/business");
}

export async function logoutBusiness() {
  await clearPortalSession();
  redirect("/business");
}

function formPayload(formData: FormData) {
  const images = String(formData.get("images") || "");
  let parsedImages: unknown = [];
  if (images) {
    try {
      parsedImages = JSON.parse(images);
    } catch {
      parsedImages = [];
    }
  }
  return {
    id: String(formData.get("id") || ""),
    name: String(formData.get("name") || ""),
    brandId: String(formData.get("brandId") || ""),
    categoryId: String(formData.get("categoryId") || ""),
    collectionId: String(formData.get("collectionId") || ""),
    description: String(formData.get("description") || ""),
    shortDescription: String(formData.get("shortDescription") || ""),
    price: String(formData.get("price") || ""),
    stockQuantity: String(formData.get("stockQuantity") || ""),
    lowStockThreshold: String(formData.get("lowStockThreshold") || ""),
    trackStock: formData.get("trackStock") === "on",
    availability: String(formData.get("availability") || ""),
    isFeatured: formData.get("isFeatured") === "on",
    isNewArrival: formData.get("isNewArrival") === "on",
    isBestSeller: formData.get("isBestSeller") === "on",
    isVisible: formData.get("isVisible") === "on",
    intent: String(formData.get("intent") || ""),
    metaTitle: String(formData.get("metaTitle") || ""),
    metaDescription: String(formData.get("metaDescription") || ""),
    images: parsedImages,
    logoUrl: String(formData.get("logoUrl") || ""),
    heroImageUrl: String(formData.get("heroImageUrl") || ""),
    productIds: formData.getAll("productIds").map(String),
    question: String(formData.get("question") || ""),
    answer: String(formData.get("answer") || ""),
    content: String(formData.get("content") || ""),
    status: String(formData.get("status") || ""),
    direction: String(formData.get("direction") || ""),
    businessName: String(formData.get("businessName") || ""),
    location: String(formData.get("location") || ""),
    whatsapp: String(formData.get("whatsapp") || ""),
    instagramHandle: String(formData.get("instagramHandle") || ""),
    tagline: String(formData.get("tagline") || ""),
    aboutText: String(formData.get("aboutText") || ""),
    originMessage: String(formData.get("originMessage") || ""),
    heroTitle: String(formData.get("heroTitle") || ""),
    heroSubtitle: String(formData.get("heroSubtitle") || ""),
    heroCtaLabel: String(formData.get("heroCtaLabel") || ""),
    heroCtaHref: String(formData.get("heroCtaHref") || ""),
    heroSecondaryLabel: String(formData.get("heroSecondaryLabel") || ""),
    heroSecondaryHref: String(formData.get("heroSecondaryHref") || ""),
    promoEnabled: formData.get("promoEnabled") === "on",
    promoText: String(formData.get("promoText") || ""),
    promoHref: String(formData.get("promoHref") || ""),
    featuredBrandIds: formData.getAll("featuredBrandIds").map(String),
    featuredCollectionIds: formData.getAll("featuredCollectionIds").map(String),
    currentPassword: String(formData.get("currentPassword") || ""),
    nextPassword: String(formData.get("nextPassword") || ""),
  };
}

async function mutate(op: string, formData: FormData, ok: string) {
  const session = await getPortalSession();
  if (!session || session.businessId !== UNIQUE_TRENDS_ID) redirect("/business");
  const result = await portalFetch(op, formPayload(formData));
  if (result.status === 401) redirect("/business");
  const id = typeof result.data.id === "string" ? result.data.id : String(formData.get("id") || "");
  if (result.data.error) {
    let back = ok.replace(":id", id).split("?")[0];
    if (ok.includes(":id") && !id) {
      back = ok.includes("/collections/") ? "/business/unique-trends/collections/new" : "/business/unique-trends/products/new";
    }
    redirect(`${back}?error=${encodeURIComponent(result.data.error)}`);
  }
  redirect(ok.replace(":id", id));
}

export async function saveDeskProduct(formData: FormData) {
  const id = String(formData.get("id") || "");
  formData.set("intent", formData.get("showInShop") === "on" ? "publish" : "draft");
  await mutate("product.save", formData, id ? `/business/unique-trends/products/${id}?saved=1` : "/business/unique-trends/products/:id?saved=1");
}

export async function setDeskAvailability(formData: FormData) {
  await mutate("product.availability", formData, "/business/unique-trends/products?saved=1");
}

export async function duplicateDeskProduct(formData: FormData) {
  await mutate("product.duplicate", formData, "/business/unique-trends/products/:id?saved=1");
}

export async function deleteDeskProduct(formData: FormData) {
  await mutate("product.delete", formData, "/business/unique-trends/products?saved=1");
}

export async function saveDeskCategory(formData: FormData) {
  await mutate("category.save", formData, "/business/unique-trends/categories?saved=1");
}

export async function deleteDeskCategory(formData: FormData) {
  await mutate("category.delete", formData, "/business/unique-trends/categories?saved=1");
}

export async function moveDeskCategory(formData: FormData) {
  await mutate("category.move", formData, "/business/unique-trends/categories?saved=1");
}

export async function saveDeskBrand(formData: FormData) {
  await mutate("brand.save", formData, "/business/unique-trends/brands?saved=1");
}

export async function deleteDeskBrand(formData: FormData) {
  await mutate("brand.delete", formData, "/business/unique-trends/brands?saved=1");
}

export async function saveDeskCollection(formData: FormData) {
  const id = String(formData.get("id") || "");
  formData.set("intent", "publish");
  await mutate("collection.save", formData, id ? `/business/unique-trends/collections/${id}?saved=1` : "/business/unique-trends/collections/:id?saved=1");
}

export async function deleteDeskCollection(formData: FormData) {
  await mutate("collection.delete", formData, "/business/unique-trends/collections?saved=1");
}

export async function saveDeskOrderStatus(formData: FormData) {
  const id = String(formData.get("id") || "");
  await mutate("order.status", formData, `/business/unique-trends/orders/${id}?saved=1`);
}

export async function saveDeskHomepage(formData: FormData) {
  formData.set("intent", "publish");
  await mutate("homepage.save", formData, "/business/unique-trends/homepage?saved=1");
}

export async function saveDeskSettings(formData: FormData) {
  await mutate("settings.save", formData, "/business/unique-trends/settings?saved=1");
}

export async function saveDeskFaq(formData: FormData) {
  await mutate("faq.save", formData, "/business/unique-trends/settings?saved=1");
}

export async function deleteDeskFaq(formData: FormData) {
  await mutate("faq.delete", formData, "/business/unique-trends/settings?saved=1");
}

export async function saveDeskPolicy(formData: FormData) {
  await mutate("policy.save", formData, "/business/unique-trends/settings?saved=1");
}

export async function saveDeskPassword(formData: FormData) {
  await mutate("account.password", formData, "/business/unique-trends/account?saved=1");
}
