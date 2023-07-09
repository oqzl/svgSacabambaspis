// SVGの名前空間を定義します
const svgns = "http://www.w3.org/2000/svg";

let randomizer = null;

// 名前に基づいたサカバンバスピスのSVGを返します
function sacabambaspisWithName(inputName, inputSize) {
	let name;
	if (inputName.length > 0) {
		name = inputName;
	} else {
		name = 'oqzl';
	}
	randomizer = SeededRandom(hashCode(name));
	return sacabambaspis(inputSize);
}

// ランダムなサカバンバスピスを描きます
function sacabambaspis(inputSize) {
	if (randomizer == null) {
		randomizer = SeededRandom();
	}

	let defaultSize = 300;
	let size;
	if (Number.isInteger(inputSize) && inputSize > 0) {
		size = inputSize;
	} else {
		size = defaultSize;
	}
	let half = size / 2;
	let scale = size / defaultSize;

	// SVG要素を作成します
	let svg = document.createElementNS(svgns, "svg");
	svg.setAttributeNS(null, "width", size);
	svg.setAttributeNS(null, "height", size);

	// 上下の境目オフセット
	let offsetY = (randomizer() * 20 + 10) * scale;
	// 顔中心のオフセット
	let offsetX = (randomizer() * 10 + 20) * scale;
	// 眼の離れ具合
	let eyeDistance = (randomizer() * 15 + 55) * scale;
	// 眼の高さ
	let eyeHeight = (randomizer() * 10 + 10) * scale;
	// 目サイズ
	let eyeSize = (12.5) * scale;
	let pupilSize = eyeSize * (randomizer() * 2 + 6) / 10;
	// 口の横幅
	let mouthWidth = eyeDistance - (randomizer() * 15 + 10) * scale;
	// 口の開き具合
	let mouthOpen = (randomizer() * 30 + 10) * scale;

	// 下半分≒背景を描きます
	let bg = document.createElementNS(svgns, "rect");
	bg.setAttributeNS(null, "width", size);
	bg.setAttributeNS(null, "height", size);
	bg.setAttributeNS(null, "fill", "#F8F5F0");
	svg.appendChild(bg);

	// 灰色の上半分を描きます
	let upperBody = document.createElementNS(svgns, "rect");
	upperBody.setAttributeNS(null, "width", size);
	upperBody.setAttributeNS(null, "height", half + offsetY);
	upperBody.setAttributeNS(null, "fill", getRandomColor());
	svg.appendChild(upperBody);

	// 右眼（左側）を描きます
	drawEye(half + offsetX - eyeDistance, half - eyeHeight + offsetY, eyeSize, pupilSize);
	// 左眼（右側）を描きます
	drawEye(half + offsetX + eyeDistance, half - eyeHeight + offsetY, eyeSize, pupilSize);

	// 口を描きます
	let m1x = half + offsetX, m1y = half + offsetY - mouthOpen / 6;
	let m2x = half + mouthWidth + offsetX, m2y = half + offsetY;
	let m3x = half + offsetX, m3y = half + offsetY + mouthOpen;
	let m4x = half - mouthWidth + offsetX, m4y = half + offsetY;
	let mouth = document.createElementNS(svgns, "polygon");
	mouth.setAttributeNS(null, "points", `${m1x},${m1y} ${m2x},${m2y} ${m3x},${m3y} ${m4x},${m4y}`);
	mouth.setAttributeNS(null, "fill", "black");
	mouth.setAttributeNS(null, "stroke", "black");
	mouth.setAttributeNS(null, "stroke-width", 4 * scale);
	mouth.setAttributeNS(null, "stroke-linecap", "round");
	mouth.setAttributeNS(null, "stroke-linejoin", "round");
	svg.appendChild(mouth);

	return svg;

	// ランダムな色を生成する関数を定義します
	function getRandomColor() {
		let letters = '9ABC';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(randomizer() * letters.length)];
		}
		return color;
	}

	// 目を描く関数を定義します
	function drawEye(cx, cy, eyeSize, pupilSize) {
		let eye = document.createElementNS(svgns, "circle");
		eye.setAttributeNS(null, "cx", cx);
		eye.setAttributeNS(null, "cy", cy);
		eye.setAttributeNS(null, "r", eyeSize);
		eye.setAttributeNS(null, "fill", "white");
		svg.appendChild(eye);

		let pupil = document.createElementNS(svgns, "circle");
		pupil.setAttributeNS(null, "cx", cx);
		pupil.setAttributeNS(null, "cy", cy);
		pupil.setAttributeNS(null, "r", pupilSize);
		pupil.setAttributeNS(null, "fill", "black");
		svg.appendChild(pupil);
	}

}

function SeededRandom(seed) {
	console.log('create randomizer with seed:' + seed);
	const a = 16807;             // 乗数
	const m = 2147483647;        // 2^31 - 1
	const q = Math.floor(m / a); // 127773
	const r = m % a;             // 2836
	let hi, lo;

	if (!seed) {
		seed = Math.floor(Math.random() * (m - 1));
	}

	seed %= m;
	if (seed <= 0) seed += m - 1;

	return function() {
		hi = seed / q;
		lo = seed % q;
		seed = a * lo - r * hi;
		if (seed <= 0) seed += m;
		return (seed - 1) / (m - 1);
	};
}

function hashCode(str) {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		let char = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash |= 0;
	}
	console.log('rreturn hash:' + hash);
	return hash;
}

export { sacabambaspis, sacabambaspisWithName };
