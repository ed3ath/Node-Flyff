QUEST_HEROKNI_TRN4 = {
	title = 'IDS_PROPQUEST_INC_001397',
	character = 'MaFl_Kurumin',
	end_character = 'MaDa_Lobiet',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_MERCENARY' },
		previous_quest = 'QUEST_HEROKNI_TRN3',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_HEROMARK', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_SOULSTONE', quantity = 8, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_WHEELEM2', quantity = 8 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_SOULSTONE', monster_id = 'MI_WHEELEM2', probability = '3000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001398',
			'IDS_PROPQUEST_INC_001399',
			'IDS_PROPQUEST_INC_001400',
			'IDS_PROPQUEST_INC_001401',
			'IDS_PROPQUEST_INC_001402',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001403',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001404',
		},
		completed = {
			'IDS_PROPQUEST_INC_001405',
			'IDS_PROPQUEST_INC_001406',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001407',
		},
	}
}
