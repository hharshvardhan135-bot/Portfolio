"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  siCss,
  siExpress,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siMongodb,
  siMysql,
  siNodedotjs,
  siPostman,
  siReact,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { skills } from "./skills-data";

type PickedSkill = (typeof skills)[number];

const shortLabel: Record<string, string> = {
  "React.js": "React",
  HTML: "HTML5",
  CSS: "CSS3",
  "Express.js": "Express",
  "REST APIs": "REST",
  "Data Structures & Algorithms": "DSA",
};

const realIcons: Record<string, SimpleIcon> = {
  "JavaScript": siJavascript,
  "React.js": siReact,
  HTML: siHtml5,
  CSS: siCss,
  "Node.js": siNodedotjs,
  "Express.js": siExpress,
  MySQL: siMysql,
  MongoDB: siMongodb,
  Git: siGit,
  GitHub: siGithub,
  Postman: siPostman,
};

const logoColorOverrides: Record<string, string> = {
  "Express.js": "#f4f5f8",
  GitHub: "#f4f5f8",
};

function makeSkillTexture(mark: string, color: string, label: string, icon?: SimpleIcon, logoColor?: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 190;
  canvas.height = 200;
  const ctx = canvas.getContext("2d")!;
  ctx.save();
  ctx.translate(100, 78);
  ctx.scale(1.15, 1.15);
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  if (mark === "ATOM") {
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    [0, 60, 120].forEach((angle) => {
      ctx.save();
      ctx.rotate((angle * Math.PI) / 180);
      ctx.beginPath();
      ctx.ellipse(0, 0, 41, 17, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    });
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();
  } else if (mark === "HTML5" || mark === "CSS3") {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(-30, -34);
    ctx.lineTo(30, -34);
    ctx.lineTo(25, 28);
    ctx.lineTo(0, 40);
    ctx.lineTo(-25, 28);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#fff";
    ctx.font = "800 42px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(mark === "HTML5" ? "5" : "3", 0, 1);
  } else if (mark === "JS") {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(-34, -34, 68, 68, 7);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#191919";
    ctx.font = "800 32px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("JS", 1, 5);
  } else if (mark === "NODE") {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      const x = Math.cos(a) * 40;
      const y = Math.sin(a) * 40;
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#14210e";
    ctx.font = "800 24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("JS", 0, 1);
  } else if (mark === "MONGO") {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, -42);
    ctx.bezierCurveTo(34, -16, 28, 18, 2, 40);
    ctx.bezierCurveTo(-28, 18, -34, -16, 0, -42);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#15351b";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(1, -29);
    ctx.lineTo(1, 31);
    ctx.stroke();
  } else if (mark === "GIT") {
    ctx.fillStyle = color;
    ctx.save();
    ctx.rotate(Math.PI / 4);
    ctx.beginPath();
    ctx.roundRect(-29, -29, 58, 58, 4);
    ctx.fill();
    ctx.restore();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-7, -14);
    ctx.lineTo(-7, 14);
    ctx.moveTo(-7, 0);
    ctx.lineTo(12, -12);
    ctx.moveTo(-7, 0);
    ctx.lineTo(12, 14);
    ctx.stroke();
    [
      [-7, -14],
      [-7, 14],
      [12, -12],
      [12, 14],
    ].forEach(([x, y]) => {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });
  } else if (mark === "JAVA") {
    ctx.shadowBlur = 0;
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-22, 7);
    ctx.lineTo(22, 7);
    ctx.lineTo(16, 29);
    ctx.quadraticCurveTo(0, 39, -16, 29);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(22, 13);
    ctx.quadraticCurveTo(39, 12, 27, 25);
    ctx.moveTo(-5, -7);
    ctx.quadraticCurveTo(8, -15, -1, -25);
    ctx.moveTo(8, -4);
    ctx.quadraticCurveTo(23, -14, 13, -27);
    ctx.stroke();
  } else {
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `800 ${mark.length > 4 ? 27 : mark.length > 3 ? 34 : mark.length > 2 ? 40 : 48}px Arial, sans-serif`;
    ctx.fillText(mark, 0, 0);
  }
  ctx.restore();
  ctx.shadowColor = "rgba(0,0,0,.65)";
  ctx.shadowBlur = 4;
  ctx.fillStyle = "#d3d0d0";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let labelSize = label.length > 21 ? 17 : label.length > 15 ? 19 : 23;
  ctx.font = `600 ${labelSize}px Arial, sans-serif`;
  while (ctx.measureText(label).width > 194 && labelSize > 12) {
    labelSize--;
    ctx.font = `600 ${labelSize}px Arial, sans-serif`;
  }
  ctx.fillText(label, 100, 190);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  if (icon) {
    const image = new Image();
    const fill = logoColor ?? `#${icon.hex}`;
    image.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.shadowColor = fill;
      ctx.shadowBlur = 12;
      ctx.drawImage(image, 36, 12, 128, 128);
      ctx.restore();
      ctx.shadowColor = "rgba(0,0,0,.65)";
      ctx.shadowBlur = 4;
      ctx.fillStyle = "#e3dfdc";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let fontSize = label.length > 15 ? 25 : label.length > 10 ? 29 : 34;
      ctx.font = `600 ${fontSize}px Arial, sans-serif`;
      while (ctx.measureText(label).width > 194 && fontSize > 14) {
        fontSize--;
        ctx.font = `600 ${fontSize}px Arial, sans-serif`;
      }
      ctx.fillText(label, 100, 184);
      texture.needsUpdate = true;
    };
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="${fill}" d="${icon.path}"/></svg>`;
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }
  return texture;
}

function makeGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(64, 64, 3, 64, 64, 64);
  gradient.addColorStop(0, "rgba(129,140,248,.24)");
  gradient.addColorStop(0.38, "rgba(56,189,248,.1)");
  gradient.addColorStop(1, "rgba(56,189,248,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

export default function SkillsUniverse() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selected, setSelected] = useState<PickedSkill | null>(null);
  const [hovered, setHovered] = useState<PickedSkill | null>(null);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduced(motionQuery.matches);
    syncMotion();
    motionQuery.addEventListener("change", syncMotion);
    return () => motionQuery.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: window.innerWidth > 680,
        powerPreference: "low-power",
      });
    } catch {
      setFailed(true);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
    camera.position.set(0, 0, window.innerWidth < 680 ? 9.5 : 9.3);
    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio || 1,
        window.innerWidth < 680 ? 1.2 : 1.6,
      ),
    );
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const globe = new THREE.Group();
    scene.add(globe);
    const sphereGeometry = new THREE.IcosahedronGeometry(1.43, 3);
    const body = new THREE.Mesh(
      sphereGeometry,
      new THREE.MeshStandardMaterial({
        color: 0x10162a,
        metalness: 0.46,
        roughness: 0.58,
        transparent: true,
        opacity: 0.94,
      }),
    );
    globe.add(body);
    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(sphereGeometry, 1),
      new THREE.LineBasicMaterial({
        color: 0x6976d9,
        transparent: true,
        opacity: 0.56,
      }),
    );
    wire.scale.setScalar(1.006);
    globe.add(wire);
    const brightWire = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.435, 2), 1),
      new THREE.LineBasicMaterial({
        color: 0xa5b4fc,
        transparent: true,
        opacity: 0.24,
      }),
    );
    globe.add(brightWire);
    const glowTexture = makeGlowTexture();
    const halo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    halo.scale.set(5.4, 5.4, 1);
    halo.position.z = -1.3;
    scene.add(halo);
    const reflectionMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const reflection = new THREE.Sprite(reflectionMaterial);
    reflection.scale.set(4.4, 1.1, 1);
    reflection.position.set(0, -2.35, -1.4);
    scene.add(reflection);
    scene.add(new THREE.AmbientLight(0xdbeafe, 0.7));
    const keyLight = new THREE.PointLight(0x818cf8, 16, 15);
    keyLight.position.set(-3.4, 3, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x38bdf8, 11, 16);
    rimLight.position.set(4, -2, -3);
    scene.add(rimLight);

    const orbitDefs = [
      { radius: 1.58, count: 9, speed: 0.12, phase: 0, scale: 1 },
      { radius: 2.4, count: 8, speed: -0.075, phase: Math.PI / 8, scale: 0.92 },
    ];
    const orbitGroups = orbitDefs.map(() => {
      const group = new THREE.Group();
      group.rotation.set(0.5, -0.08, 0.08);
      scene.add(group);
      return group;
    });
    const skillSprites: {
      sprite: THREE.Sprite;
      skill: PickedSkill;
      angle: number;
      radius: number;
      speed: number;
      group: THREE.Group;
      width: number;
      height: number;
    }[] = [];
    const mobile = window.innerWidth < 680;

    skills.forEach((skill, index) => {
      const orbitIndex = index < orbitDefs[0].count ? 0 : 1;
      const orbitConfig = orbitDefs[orbitIndex];
      const slot =
        index -
        orbitDefs
          .slice(0, orbitIndex)
          .reduce((total, lane) => total + lane.count, 0);
      const texture = makeSkillTexture(
        skill.mark,
        skill.color,
        shortLabel[skill.name] ?? skill.name,
        realIcons[skill.name],
        logoColorOverrides[skill.name],
      );
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        sizeAttenuation: true,
      });
      const sprite = new THREE.Sprite(material);
      const laneScale = orbitConfig.scale * (mobile ? 0.86 : 1);
      const width = 0.505 * laneScale;
      const height = 0.525 * laneScale;
      sprite.scale.set(width, height, 1);
      sprite.userData.baseWidth = width;
      sprite.userData.baseHeight = height;
      sprite.userData.skill = skill;
      const angle =
        orbitConfig.phase + (slot / orbitConfig.count) * Math.PI * 2;
      const group = orbitGroups[orbitIndex];
      sprite.position.set(
        Math.cos(angle) * orbitConfig.radius,
        Math.sin(angle) * orbitConfig.radius,
        0,
      );
      group.add(sprite);
      skillSprites.push({
        sprite,
        skill,
        angle,
        radius: orbitConfig.radius,
        speed: orbitConfig.speed,
        group,
        width,
        height,
      });
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const drag = { down: false, moved: false, x: 0, y: 0, yaw: 0, pitch: 0 };
    const clock = new THREE.Clock();
    let visible = false;
    let pageVisible = !document.hidden;
    let isReduced = motionQuery.matches;
    let hoverTarget: THREE.Sprite | null = null;
    let selectedTarget: THREE.Sprite | null = null;
    const render = () => renderer.render(scene, camera);
    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.04);
      if (!drag.down && !isReduced) drag.yaw += delta * 0.1;
      globe.rotation.y += (drag.yaw - globe.rotation.y) * 0.045;
      globe.rotation.x += (drag.pitch * 0.22 - globe.rotation.x) * 0.045;
      const parallaxX = pointer.x * 0.08;
      const parallaxY = pointer.y * 0.045;
      globe.position.x += (parallaxX - globe.position.x) * 0.025;
      globe.position.y += (parallaxY - globe.position.y) * 0.025;
      halo.position.x = globe.position.x;
      halo.position.y = globe.position.y;
      if (!isReduced)
        skillSprites.forEach((item) => {
          item.angle += delta * item.speed;
        });
      skillSprites.forEach((item) => {
        const focused = item.sprite === hoverTarget;
        const selected = item.sprite === selectedTarget;
        const targetFactor = focused ? 1.38 : selected ? 1.2 : 1;
        const ease = isReduced ? 1 : 1 - Math.exp(-delta * 16);
        item.sprite.scale.x += (item.width * targetFactor - item.sprite.scale.x) * ease;
        item.sprite.scale.y += (item.height * targetFactor - item.sprite.scale.y) * ease;
        item.sprite.position.set(
          Math.cos(item.angle) * item.radius,
          Math.sin(item.angle) * item.radius,
          focused || selected ? 0.08 : 0,
        );
      });
      render();
    };
    const syncLoop = () =>
      renderer.setAnimationLoop(
        visible && pageVisible && !isReduced ? animate : null,
      );
    const setRay = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
    };
    const onPointerDown = (event: PointerEvent) => {
      drag.down = true;
      drag.moved = false;
      drag.x = event.clientX;
      drag.y = event.clientY;
      canvas.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      setRay(event);
      if (drag.down) {
        const dx = event.clientX - drag.x;
        const dy = event.clientY - drag.y;
        if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
        drag.yaw += dx * 0.008;
        drag.pitch = THREE.MathUtils.clamp(drag.pitch + dy * 0.006, -1.1, 1.1);
        drag.x = event.clientX;
        drag.y = event.clientY;
      }
      const hitObject = raycaster.intersectObjects(
        [body, ...skillSprites.map((entry) => entry.sprite)],
        false,
      )[0]?.object;
      const hit = hitObject instanceof THREE.Sprite ? hitObject : undefined;
      const next = hit ?? null;
      if (hoverTarget !== next) {
        hoverTarget = next;
        if (isReduced) {
          skillSprites.forEach((item) => {
            const factor = item.sprite === hoverTarget ? 1.38 : item.sprite === selectedTarget ? 1.2 : 1;
            item.sprite.scale.set(item.width * factor, item.height * factor, 1);
          });
        }
        setHovered((next?.userData.skill as PickedSkill | undefined) ?? null);
        canvas.style.cursor = next ? "pointer" : "grab";
        render();
      }
    };
    const onPointerUp = (event: PointerEvent) => {
      if (drag.down && !drag.moved) {
        setRay(event);
        const hitObject = raycaster.intersectObjects(
          [body, ...skillSprites.map((entry) => entry.sprite)],
          false,
        )[0]?.object;
        const hit = hitObject instanceof THREE.Sprite ? hitObject : undefined;
        if (hit?.userData.skill) {
          selectedTarget = hit;
          setSelected(hit.userData.skill as PickedSkill);
          if (isReduced) hit.scale.set(hit.userData.baseWidth * 1.2, hit.userData.baseHeight * 1.2, 1);
          render();
        }
      }
      drag.down = false;
    };
    const onPointerLeave = () => {
      if (!drag.down) {
        setHovered(null);
        hoverTarget = null;
        if (isReduced) {
          skillSprites.forEach((item) => {
            const factor = item.sprite === selectedTarget ? 1.2 : 1;
            item.sprite.scale.set(item.width * factor, item.height * factor, 1);
          });
        }
        canvas.style.cursor = "grab";
        render();
      }
    };
    const onVisibility = () => {
      pageVisible = !document.hidden;
      syncLoop();
      if (pageVisible) render();
    };
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    const resize = () => {
      const { width, height } = stage.getBoundingClientRect();
      if (!width || !height) return;
      camera.position.z = width < 680 ? 9.5 : 9.3;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      render();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    resize();
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncLoop();
        if (visible) render();
      },
      { rootMargin: "120px 0px" },
    );
    observer.observe(stage);
    const onMotionChange = (event: MediaQueryListEvent) => {
      isReduced = event.matches;
      syncLoop();
      render();
    };
    motionQuery.addEventListener("change", onMotionChange);
    visible =
      stage.getBoundingClientRect().top < window.innerHeight &&
      stage.getBoundingClientRect().bottom > 0;
    syncLoop();
    render();

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      motionQuery.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      renderer.setAnimationLoop(null);
      scene.traverse((object) => {
        const renderable = object as THREE.Mesh | THREE.Line | THREE.Sprite;
        renderable.geometry?.dispose?.();
        const materials = Array.isArray(renderable.material)
          ? renderable.material
          : renderable.material
            ? [renderable.material]
            : [];
        materials.forEach((material) => {
          const map = (material as THREE.SpriteMaterial).map;
          map?.dispose();
          material.dispose();
        });
      });
      renderer.dispose();
    };
  }, [reduced]);

  return (
    <div className="skill-universe" data-reveal>
      <div className="skill-flow-meta">
        <span>LANGUAGES, FRAMEWORKS, FOUNDATIONS &amp; TOOLS</span>
        <span>{String(skills.length).padStart(2, "0")} SKILLS</span>
      </div>
      <div
        className={`skill-universe-stage${failed ? " skill-scene-failed" : ""}`}
        ref={stageRef}
      >
        {!failed && (
          <canvas
            ref={canvasRef}
            className="skill-universe-canvas"
            aria-hidden="true"
          />
        )}
        {failed && <div className="skill-fallback-orb" aria-hidden="true" />}
        <span className="skill-universe-prompt">
          {reduced
            ? "REDUCED MOTION · SELECT A SKILL BELOW"
            : "DRAG TO EXPLORE · SELECT A SKILL"}
        </span>
        {hovered && (
          <div className="skill-hover-label" aria-hidden="true">
            {hovered.name}
          </div>
        )}
      </div>
      <div className="skill-detail" aria-live="polite">
        {selected ? (
          <>
            <span>{selected.category}</span>
            <strong>{selected.name}</strong>
            <p>{selected.description}</p>
          </>
        ) : (
          <span>Select a technology to see how it fits into my toolkit.</span>
        )}
      </div>
      <div className="skill-access-list" aria-label="Select a technology">
        {skills.map((skill) => (
          <button
            type="button"
            key={skill.name}
            aria-pressed={selected?.name === skill.name}
            onClick={() => setSelected(skill)}
          >
            <i
              style={{ "--skill-color": skill.color } as React.CSSProperties}
            />
            {skill.name}
          </button>
        ))}
      </div>
      {failed && (
        <p className="skill-fallback-note">
          The interactive scene is unavailable in this browser. Choose a skill
          from the list above.
        </p>
      )}
    </div>
  );
}
