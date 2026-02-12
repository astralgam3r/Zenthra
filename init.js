// ===================================
// GLOBAL FUNCTIONS INITIALIZATION
// Este archivo se carga ANTES que todo para evitar errores de "not defined"
// ===================================

// Funciones VIP que vienen de features.js
window.showVIPModal = window.showVIPModal || function() {
    console.log('showVIPModal será cargado por features.js');
};

window.closeVIPModal = window.closeVIPModal || function() {
    console.log('closeVIPModal será cargado por features.js');
};

window.submitVIPKey = window.submitVIPKey || function() {
    console.log('submitVIPKey será cargado por features.js');
};

window.deactivateVIP = window.deactivateVIP || function() {
    console.log('deactivateVIP será cargado por features.js');
};

window.saveColors = window.saveColors || function() {
    console.log('saveColors será cargado por features.js');
};

window.resetColors = window.resetColors || function() {
    console.log('resetColors será cargado por features.js');
};

window.downloadSettings = window.downloadSettings || function() {
    console.log('downloadSettings será cargado por features.js');
};

window.uploadSettings = window.uploadSettings || function() {
    console.log('uploadSettings será cargado por features.js');
};

// Funciones que vienen de script.js
window.switchSection = window.switchSection || function(sectionId, navItem) {
    console.log('switchSection será cargado por script.js');
};

window.scrollToSection = window.scrollToSection || function(sectionId) {
    console.log('scrollToSection será cargado por script.js');
};

window.saveSiteTitle = window.saveSiteTitle || function() {
    console.log('saveSiteTitle será cargado por script.js');
};

window.saveFavicon = window.saveFavicon || function() {
    console.log('saveFavicon será cargado por script.js');
};

window.savePanicSettings = window.savePanicSettings || function() {
    console.log('savePanicSettings será cargado por script.js');
};

window.toggleParticles = window.toggleParticles || function() {
    console.log('toggleParticles será cargado por script.js');
};

window.toggleAnimations = window.toggleAnimations || function() {
    console.log('toggleAnimations será cargado por script.js');
};

window.clearCache = window.clearCache || function() {
    console.log('clearCache será cargado por script.js');
};

window.resetSettings = window.resetSettings || function() {
    console.log('resetSettings será cargado por script.js');
};

// Prevenir errores en consola
console.log('✅ Init.js loaded - Function stubs ready');