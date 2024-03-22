QUEST_HERORIN_TRN2 = {
	title = 'IDS_PROPQUEST_INC_001552',
	character = 'MaDa_Ellend',
	end_character = 'MaFl_Clamb',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_ASSIST' },
		previous_quest = 'QUEST_HERORIN_TRN1',
	},
	rewards = {
		gold = 0,
		exp = 0,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_MARKEIEN', quantity = 1, sex = 'Any', remove = false },
		},
		monsters = {
			{ id = 'MI_REN', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_MARKEIEN', monster_id = 'MI_REN', probability = '3000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001553',
			'IDS_PROPQUEST_INC_001554',
			'IDS_PROPQUEST_INC_001555',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001556',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001557',
		},
		completed = {
			'IDS_PROPQUEST_INC_001558',
			'IDS_PROPQUEST_INC_001559',
			'IDS_PROPQUEST_INC_001560',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001561',
		},
	}
}
