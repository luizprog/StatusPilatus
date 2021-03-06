/*
*    StatusPilatus: Monitor your PC like never before!
*    Copyright (C) 2019 PilatusDevs
*
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    (at your option) any later version.
*
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* global si $ */
"use strict";

module.exports = {
    init: initGpu,
    refresh: refreshGpu,
    activate: activateGpu
};

// Storing static GPU title
let gpuTitle = "";
let gpuData = [];

function initGpu() {
    // Nothing
}

function activateGpu() {
    if (gpuData.length === 0) {
        si.graphics()
            .then(data => {
                const allGpus = data.controllers;
                gpuData = allGpus.filter(g => g.model !== "");
                gpuTitle = gpuData.map(g => g.model).join(" + ");
                $("#subtitle").text(gpuTitle);
                $("#gpu-container").html(gpuHtml(gpuData));
            });
    } else {
        $("#subtitle").text(gpuTitle);
        $("#gpu-container").html(gpuHtml(gpuData));
    }
}

function refreshGpu() {
    // Nothing
}

function gpuHtml(gpuData) {
    let body = "";
    gpuData.forEach((gpu, index) => {
        body += `<div class="col l6 xl4">
        <div class="card">
            <div class="card-content">
                <span class="card-title">GPU ${index+1}</span>
                <b>Vendor</b>: ${gpu.vendor}<br />
                <b>Model</b>: ${gpu.model}<br />
                <b>VRAM</b>: ${gpu.vram} MB, ${(gpu.vramDynamic ? "dynamic" : "static")}<br />
                <b>Bus</b>: ${gpu.bus}<br />
            </div>
        </div>
        </div>`;
    });
    return body;
}
