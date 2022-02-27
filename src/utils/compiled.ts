export const compiledFunctions = [
  {
    condition: ({ cutterDiameter, cutterShankDiameter, woc }) => {
      return cutterDiameter < cutterShankDiameter && woc > cutterDiameter / 2;
    },
    functions: {
      adjustedChipload: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return chipload;
      },
      feedrate: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return chipload * cutterFlutes * rpm;
      },
      materialRemovalRate: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return chipload * cutterFlutes * doc * rpm * woc;
      },
      powerUsage: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          chipload *
          cutterFlutes *
          doc *
          Math.pow(materialKFactor, -1) *
          rpm *
          woc
        );
      },
      torque: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          63024 *
          (chipload * cutterFlutes * doc * Math.pow(materialKFactor, -1) * woc)
        );
      },
      machineForce: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          126048 *
          (chipload *
            Math.pow(cutterDiameter, -1) *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            woc)
        );
      },
      machineForcePercent: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          126048 *
          (chipload *
            Math.pow(cutterDiameter, -1) *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(maximumMachineForce, -1) *
            woc)
        );
      },
      availablePowerPercent: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          chipload *
          cutterFlutes *
          doc *
          Math.pow(materialKFactor, -1) *
          Math.pow(routerOutputPower, -1) *
          rpm *
          woc
        );
      },
      routerCutterPowerIncrease: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          745.7 *
          (chipload *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            rpm *
            woc)
        );
      },
      maxDeflection: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          126048 *
          ((6.79061090525420116179 *
            (Math.pow(-cutterLength + cutterOverallStickout, 3) *
              Math.pow(
                Math.pow(cutterShankDiameter, 4) * cutterYoungsModulus,
                -1
              )) +
            6.79061090525420224451 *
              (Math.pow(cutterDiameter, -4) *
                Math.pow(cutterLength, 3) *
                Math.pow(cutterYoungsModulus, -1))) *
            chipload *
            Math.pow(cutterDiameter, -1) *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            woc)
        );
      },
      maxDeflectionPercent: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          126048 *
          ((6.79061090525420116179 *
            (Math.pow(-cutterLength + cutterOverallStickout, 3) *
              Math.pow(
                Math.pow(cutterShankDiameter, 4) * cutterYoungsModulus,
                -1
              )) +
            6.79061090525420224451 *
              (Math.pow(cutterDiameter, -4) *
                Math.pow(cutterLength, 3) *
                Math.pow(cutterYoungsModulus, -1))) *
            chipload *
            Math.pow(cutterDiameter, -1) *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(maxAcceptableDeflection, -1) *
            woc)
        );
      },
    },
  },
  {
    condition: ({ cutterDiameter, cutterShankDiameter, woc }) => {
      return cutterDiameter == cutterShankDiameter && woc > cutterDiameter / 2;
    },
    functions: {
      adjustedChipload: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return chipload;
      },
      feedrate: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return chipload * cutterFlutes * rpm;
      },
      materialRemovalRate: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return chipload * cutterFlutes * doc * rpm * woc;
      },
      powerUsage: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          chipload *
          cutterFlutes *
          doc *
          Math.pow(materialKFactor, -1) *
          rpm *
          woc
        );
      },
      torque: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          63024 *
          (chipload * cutterFlutes * doc * Math.pow(materialKFactor, -1) * woc)
        );
      },
      machineForce: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          126048 *
          (chipload *
            Math.pow(cutterDiameter, -1) *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            woc)
        );
      },
      machineForcePercent: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          126048 *
          (chipload *
            Math.pow(cutterDiameter, -1) *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(maximumMachineForce, -1) *
            woc)
        );
      },
      availablePowerPercent: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          chipload *
          cutterFlutes *
          doc *
          Math.pow(materialKFactor, -1) *
          Math.pow(routerOutputPower, -1) *
          rpm *
          woc
        );
      },
      routerCutterPowerIncrease: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          745.7 *
          (chipload *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            rpm *
            woc)
        );
      },
      maxDeflection: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          855942.92338548168451638159 *
          (chipload *
            Math.pow(cutterDiameter, -5) *
            cutterFlutes *
            Math.pow(cutterOverallStickout, 3) *
            Math.pow(cutterYoungsModulus, -1) *
            doc *
            Math.pow(materialKFactor, -1) *
            woc)
        );
      },
      maxDeflectionPercent: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          855942.92338548168451638159 *
          (chipload *
            Math.pow(cutterDiameter, -5) *
            cutterFlutes *
            Math.pow(cutterOverallStickout, 3) *
            Math.pow(cutterYoungsModulus, -1) *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(maxAcceptableDeflection, -1) *
            woc)
        );
      },
    },
  },
  {
    condition: ({ cutterDiameter, cutterShankDiameter, woc }) => {
      return cutterDiameter > cutterShankDiameter && woc > cutterDiameter / 2;
    },
    functions: {
      adjustedChipload: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return chipload;
      },
      feedrate: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return chipload * cutterFlutes * rpm;
      },
      materialRemovalRate: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return chipload * cutterFlutes * doc * rpm * woc;
      },
      powerUsage: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          chipload *
          cutterFlutes *
          doc *
          Math.pow(materialKFactor, -1) *
          rpm *
          woc
        );
      },
      torque: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          63024 *
          (chipload * cutterFlutes * doc * Math.pow(materialKFactor, -1) * woc)
        );
      },
      machineForce: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          126048 *
          (chipload *
            Math.pow(cutterDiameter, -1) *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            woc)
        );
      },
      machineForcePercent: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          126048 *
          (chipload *
            Math.pow(cutterDiameter, -1) *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(maximumMachineForce, -1) *
            woc)
        );
      },
      availablePowerPercent: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          chipload *
          cutterFlutes *
          doc *
          Math.pow(materialKFactor, -1) *
          Math.pow(routerOutputPower, -1) *
          rpm *
          woc
        );
      },
      routerCutterPowerIncrease: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          745.7 *
          (chipload *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            rpm *
            woc)
        );
      },
      maxDeflection: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          855942.92338548168451638159 *
          (chipload *
            Math.pow(cutterDiameter, -1) *
            cutterFlutes *
            Math.pow(cutterOverallStickout, 3) *
            Math.pow(cutterShankDiameter, -4) *
            Math.pow(cutterYoungsModulus, -1) *
            doc *
            Math.pow(materialKFactor, -1) *
            woc)
        );
      },
      maxDeflectionPercent: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          855942.92338548168451638159 *
          (chipload *
            Math.pow(cutterDiameter, -1) *
            cutterFlutes *
            Math.pow(cutterOverallStickout, 3) *
            Math.pow(cutterShankDiameter, -4) *
            Math.pow(cutterYoungsModulus, -1) *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(maxAcceptableDeflection, -1) *
            woc)
        );
      },
    },
  },
  {
    condition: ({ cutterDiameter, cutterShankDiameter, woc }) => {
      return cutterDiameter < cutterShankDiameter && woc <= cutterDiameter / 2;
    },
    functions: {
      adjustedChipload: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          0.5 *
          (chipload *
            cutterDiameter *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1))
        );
      },
      feedrate: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          0.5 *
          (chipload *
            cutterDiameter *
            cutterFlutes *
            rpm *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1))
        );
      },
      materialRemovalRate: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          0.5 *
          (chipload *
            cutterDiameter *
            cutterFlutes *
            doc *
            rpm *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      powerUsage: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          0.5 *
          (chipload *
            cutterDiameter *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            rpm *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      torque: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          31512 *
          (chipload *
            cutterDiameter *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      machineForce: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          63024 *
          (chipload *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      machineForcePercent: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          63024 *
          (chipload *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(maximumMachineForce, -1) *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      availablePowerPercent: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          0.5 *
          (chipload *
            cutterDiameter *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(routerOutputPower, -1) *
            rpm *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      routerCutterPowerIncrease: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          372.85 *
          (chipload *
            cutterDiameter *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            rpm *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      maxDeflection: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          63024 *
          ((6.79061090525420116179 *
            (Math.pow(-cutterLength + cutterOverallStickout, 3) *
              Math.pow(
                Math.pow(cutterShankDiameter, 4) * cutterYoungsModulus,
                -1
              )) +
            6.79061090525420224451 *
              (Math.pow(cutterDiameter, -4) *
                Math.pow(cutterLength, 3) *
                Math.pow(cutterYoungsModulus, -1))) *
            chipload *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      maxDeflectionPercent: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          63024 *
          ((6.79061090525420116179 *
            (Math.pow(-cutterLength + cutterOverallStickout, 3) *
              Math.pow(
                Math.pow(cutterShankDiameter, 4) * cutterYoungsModulus,
                -1
              )) +
            6.79061090525420224451 *
              (Math.pow(cutterDiameter, -4) *
                Math.pow(cutterLength, 3) *
                Math.pow(cutterYoungsModulus, -1))) *
            chipload *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(maxAcceptableDeflection, -1) *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
    },
  },
  {
    condition: ({ cutterDiameter, cutterShankDiameter, woc }) => {
      return cutterDiameter == cutterShankDiameter && woc <= cutterDiameter / 2;
    },
    functions: {
      adjustedChipload: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          0.5 *
          (chipload *
            cutterDiameter *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1))
        );
      },
      feedrate: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          0.5 *
          (chipload *
            cutterDiameter *
            cutterFlutes *
            rpm *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1))
        );
      },
      materialRemovalRate: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          0.5 *
          (chipload *
            cutterDiameter *
            cutterFlutes *
            doc *
            rpm *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      powerUsage: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          0.5 *
          (chipload *
            cutterDiameter *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            rpm *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      torque: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          31512 *
          (chipload *
            cutterDiameter *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      machineForce: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          63024 *
          (chipload *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      machineForcePercent: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          63024 *
          (chipload *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(maximumMachineForce, -1) *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      availablePowerPercent: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          0.5 *
          (chipload *
            cutterDiameter *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(routerOutputPower, -1) *
            rpm *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      routerCutterPowerIncrease: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          372.85 *
          (chipload *
            cutterDiameter *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            rpm *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      maxDeflection: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          427971.46169274084225819079 *
          (chipload *
            Math.pow(cutterDiameter, -4) *
            cutterFlutes *
            Math.pow(cutterOverallStickout, 3) *
            Math.pow(cutterYoungsModulus, -1) *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      maxDeflectionPercent: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          427971.46169274084225819079 *
          (chipload *
            Math.pow(cutterDiameter, -4) *
            cutterFlutes *
            Math.pow(cutterOverallStickout, 3) *
            Math.pow(cutterYoungsModulus, -1) *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(maxAcceptableDeflection, -1) *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
    },
  },
  {
    condition: ({ cutterDiameter, cutterShankDiameter, woc }) => {
      return cutterDiameter > cutterShankDiameter && woc <= cutterDiameter / 2;
    },
    functions: {
      adjustedChipload: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          0.5 *
          (chipload *
            cutterDiameter *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1))
        );
      },
      feedrate: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          0.5 *
          (chipload *
            cutterDiameter *
            cutterFlutes *
            rpm *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1))
        );
      },
      materialRemovalRate: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          0.5 *
          (chipload *
            cutterDiameter *
            cutterFlutes *
            doc *
            rpm *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      powerUsage: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          0.5 *
          (chipload *
            cutterDiameter *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            rpm *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      torque: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          31512 *
          (chipload *
            cutterDiameter *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      machineForce: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          63024 *
          (chipload *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      machineForcePercent: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          63024 *
          (chipload *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(maximumMachineForce, -1) *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      availablePowerPercent: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          0.5 *
          (chipload *
            cutterDiameter *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(routerOutputPower, -1) *
            rpm *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      routerCutterPowerIncrease: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          372.85 *
          (chipload *
            cutterDiameter *
            cutterFlutes *
            doc *
            Math.pow(materialKFactor, -1) *
            rpm *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      maxDeflection: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          427971.46169274084225819079 *
          (chipload *
            cutterFlutes *
            Math.pow(cutterOverallStickout, 3) *
            Math.pow(cutterShankDiameter, -4) *
            Math.pow(cutterYoungsModulus, -1) *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
      maxDeflectionPercent: function anonymous(
        chipload,
        woc,
        doc,
        rpm,
        maxAcceptableDeflection,
        cutterDiameter,
        materialKFactor,
        cutterFlutes,
        maximumMachineForce,
        routerOutputPower,
        cutterOverallStickout,
        cutterYoungsModulus,
        cutterShankDiameter,
        cutterLength
      ) {
        return (
          427971.46169274084225819079 *
          (chipload *
            cutterFlutes *
            Math.pow(cutterOverallStickout, 3) *
            Math.pow(cutterShankDiameter, -4) *
            Math.pow(cutterYoungsModulus, -1) *
            doc *
            Math.pow(materialKFactor, -1) *
            Math.pow(maxAcceptableDeflection, -1) *
            Math.pow(Math.sqrt(cutterDiameter * woc + -Math.pow(woc, 2)), -1) *
            woc)
        );
      },
    },
  },
];
