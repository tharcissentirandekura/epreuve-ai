export const correctAnswers = {
  "I": {
    "1": {
      answer: "vrai",
      explanation: "L'augmentation de la concentration des réactifs augmente effectivement la vitesse de réaction selon la loi de vitesse. Plus il y a de molécules réactives dans un volume donné, plus les collisions efficaces sont fréquentes, ce qui accélère la réaction."
    },
    "2": {
      answer: "faux",
      explanation: "Un catalyseur modifie la vitesse de réaction mais ne change pas l'état d'équilibre. Il accélère à la fois la réaction directe et inverse dans la même proportion, permettant d'atteindre l'équilibre plus rapidement sans modifier les concentrations à l'équilibre."
    },
    "3": {
      answer: "vrai",
      explanation: "L'effet d'ion commun diminue la solubilité d'un sel peu soluble. Selon le principe de Le Chatelier, l'ajout d'un ion déjà présent dans l'équilibre de dissolution déplace l'équilibre vers la formation du précipité."
    },
    "4": {
      answer: "vrai",
      explanation: "Pour un sel d'acide faible et de base faible, le pH dépend uniquement des constantes Ka et Kb, pas de la concentration. La formule est pH = 7 + 0.5(pKa - pKb)."
    },
    "5": {
      answer: "faux",
      explanation: "La position du deuxième substituant dépend à la fois de la nature du premier substituant ET de sa position sur le cycle benzénique. Les groupes orientent vers les positions ortho/para ou méta selon leur caractère électrodonneur ou électroattracteur."
    }
  },
  "II": {
    "1": {
      answer: "C",
      explanation: "Si la vitesse initiale est divisée par 25, et que la réaction est d'ordre 2 (A + B → P), alors [A] × [B] est divisé par 25. Avec des concentrations initiales égales de 5 M chacune, si x moles ont réagi, alors (5-x)² = 25/25 = 1, donc 5-x = 1, x = 4. Il reste donc 2 moles de A."
    },
    "2": {
      answer: "B",
      explanation: "Pour un acide faible, lors d'une dilution de facteur 100, le pH augmente d'environ 1 unité. Ceci est dû au fait que le degré de dissociation augmente avec la dilution, mais pas proportionnellement à la dilution."
    },
    "3": {
      answer: "D",
      explanation: "Pour NH₃ 0,001 M avec pOH = 4: [OH⁻] = 10⁻⁴ M. Kb = [NH₄⁺][OH⁻]/[NH₃] = (10⁻⁴)²/(0,001-10⁻⁴) ≈ 10⁻⁵ = 1,8×10⁻⁵, donc pKb ≈ 5."
    },
    "4": {
      answer: "B",
      explanation: "Le résorcinol est le 1,3-dihydroxybenzène. Il possède deux groupes hydroxyle (-OH) en positions méta (1,3) sur le cycle benzénique."
    }
  }
};

export const detailedExplanations = {
  "III": {
    "1": {
      explanation: "Cette question porte sur l'équilibre chimique et le calcul de constantes d'équilibre.",
      subparts: {
        "a": "Pour calculer Kp, utilisez les pressions partielles à l'équilibre. Avec 55% de CO converti, calculez les moles de chaque espèce puis les pressions partielles.",
        "b": "La pression totale est la somme des pressions partielles de tous les gaz présents à l'équilibre."
      }
    },
    "2": {
      explanation: "Cette question concerne l'hydrolyse des sels et les calculs de pH.",
      subparts: {
        "a": "Les espèces présentes sont: C₆H₅O⁻, Na⁺, OH⁻, H⁺, C₆H₅OH, H₂O",
        "b": "Utilisez les relations d'équilibre et d'électroneutralité pour calculer les concentrations.",
        "c": "Calculez d'abord la concentration du sel, puis la masse correspondante."
      }
    },
    "3": {
      explanation: "Problème de mélange acide-base avec calcul de pH final. Utilisez les équations de neutralisation et les relations de pH."
    },
    "4": {
      explanation: "Calculs de solubilité et produit de solubilité.",
      subparts: {
        "a": "Comparez le produit ionique Q avec Kps pour déterminer s'il y a précipitation.",
        "b": "Avec l'ajout de NaCl, recalculez Q et déterminez la masse qui précipite."
      }
    },
    "5": {
      explanation: "Réactions de substitution électrophile aromatique et nomenclature des composés organiques."
    }
  }
};