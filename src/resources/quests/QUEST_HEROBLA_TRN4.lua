QUEST_HEROBLA_TRN4 = {
	title = 'IDS_PROPQUEST_INC_001459',
	character = 'MaFl_Ata',
	end_character = 'MaDa_Jeperdy',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_MERCENARY' },
		previous_quest = 'QUEST_HEROBLA_TRN3',
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
			{ id = 'II_SYS_SYS_QUE_TEARDARK', quantity = 1, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_SHAKALPION', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_TEARDARK', monster_id = 'MI_SHAKALPION', probability = '3000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001460',
			'IDS_PROPQUEST_INC_001461',
			'IDS_PROPQUEST_INC_001462',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001463',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001464',
		},
		completed = {
			'IDS_PROPQUEST_INC_001465',
			'IDS_PROPQUEST_INC_001466',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001467',
		},
	}
}
